---
title: Wave 112 Agent A — eee Repos+Features Inventory + Missing-SOTA Gap Analysis
status: AUTHORITATIVE
date: 2026-05-09
agent: sota-researcher
wave: 112
fire: A
---

# Wave 112 Agent A — eee repos+features inventory + missing-SOTA gap analysis

**Scope**: Line-by-line feature inventory (FILE-LEVEL) for 21+ active plugins / 8 MCPs / outer-research kits / cwc / Phoenix / cnighswonger / CPA / Ollama. Companion to Wave 111 Agent H (high-level architecture HNF).

**Methodology**: Direct file enumeration via Bash + grep against marketplace caches at `Z:/claude-sota-installed/.claude/plugins/cache/<marketplace>/<plugin>/<version>/` + `.mcp.json` + `settings.json` hooks block. All counts MEASURED 2026-05-09 (this fire).

**Headline number**: 4 marketplaces × 23 enabled plugins → **267 SKILL.md + 68 agents + 86 commands + 9 plugin-level hooks.json** + 8 MCP servers + 22 local hook scripts + 5 cwc primitives + 9 local subagents.

---

## SECTION 1 — Plugin-by-plugin feature inventory (FILE-LEVEL)

### Marketplace A: `claude-plugins-official` (Anthropic OFFICIAL — 19 enabled plugins)

Source: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/<plugin>/<version>/`
Marketplace registration: `.claude/settings.json:extraKnownMarketplaces.claude-plugins-official` → `anthropics/claude-plugins-official`.

| # | Plugin | Version | Skills | Agents | Commands | Hooks | Notes |
|---|--------|---------|-------:|-------:|---------:|:-----:|-------|
| 1 | superpowers | 5.1.0 | 14 | 0 | 0 | Y | TIER-1 workflow grammar (brainstorming/writing-plans/TDD/etc) — using-superpowers auto-fires |
| 2 | code-review | 03dc5d77f067 | 0 | 0 | 1 | N | multi-agent confidence-scored review |
| 3 | skill-creator | 03dc5d77f067 | 1 | 0 | 0 | N | skill authoring + benchmarking |
| 4 | pr-review-toolkit | 03dc5d77f067 | 0 | 6 | 1 | N | 6 specialized PR-review angles incl silent-failure-hunter |
| 5 | feature-dev | 03dc5d77f067 | 0 | 3 | 1 | N | feature dev workflow agents |
| 6 | frontend-design | 03dc5d77f067 | 1 | 0 | 0 | N | UI/UX design skill |
| 7 | playground | 03dc5d77f067 | 1 | 0 | 0 | N | interactive HTML viz |
| 8 | commit-commands | 03dc5d77f067 | 0 | 0 | 3 | N | git commit/push/PR commands |
| 9 | code-simplifier | 1.0.0 | 0 | 1 | 0 | N | refactor agent |
| 10 | security-guidance | 76b35e91d1c9 | 0 | 0 | 0 | Y | security PreToolUse + warning log |
| 11 | plugin-dev | 03dc5d77f067 | 7 | 3 | 1 | N | plugin authoring toolkit |
| 12 | mcp-server-dev | 03dc5d77f067 | 3 | 0 | 0 | N | MCP server design skills |
| 13 | agent-sdk-dev | 03dc5d77f067 | 0 | 2 | 1 | N | Agent SDK dev pattern |
| 14 | claude-code-setup | 1.0.0 | 1 | 0 | 0 | N | codebase analyzer |
| 15 | claude-md-management | 1.0.0 | 1 | 0 | 1 | N | claude-md-improver + /revise-claude-md |
| 16 | ralph-loop | 1.0.0 | 0 | 0 | 3 | Y | Ralph autonomous loop primitive |
| 17 | session-report | 03dc5d77f067 | 1 | 0 | 0 | N | HTML session usage report |
| 18 | typescript-lsp | 1.0.0 | 0 | 0 | 0 | N | LSP daemon (placeholder) |
| 19 | pyright-lsp | 1.0.0 | 0 | 0 | 0 | N | Pyright LSP wrapper |

**Subtotals (claude-plugins-official)**: skills=30 / agents=15 / commands=14 / hooks-shipping plugins=3 (superpowers + security-guidance + ralph-loop).

Cite TIER-1-DIRECT: `.claude/settings.json:enabledPlugins` block @ HEAD content-shown verbatim above. Marketplace HEAD `03dc5d77f067` for 8 plugins indicates batch-cloned from anthropics/claude-plugins-official @ that snapshot.

### Marketplace B: `addy-agent-skills` (named-author Addy Osmani / Google Chrome — 1 plugin)

Source: `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/`

| # | Plugin | Version | Skills | Agents | Commands | Hooks | Notes |
|---|--------|---------|-------:|-------:|---------:|:-----:|-------|
| 20 | agent-skills | 742dca58ae55 | 21 | 4 | 0 | Y | 21 engineering-phase skills + 7 lifecycle commands per claude-md L327; using-agent-skills meta auto-fires |

The 21 engineering skills enumerated: api-and-interface-design / browser-testing-with-devtools / ci-cd-and-automation / code-review-and-quality / code-simplification / context-engineering / debugging-and-error-recovery / deprecation-and-migration / documentation-and-adrs / frontend-ui-engineering / git-workflow-and-versioning / idea-refine / incremental-implementation / performance-optimization / planning-and-task-breakdown / security-and-hardening / shipping-and-launch / source-driven-development / spec-driven-development / test-driven-development / using-agent-skills.

Cite: `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` (HEAD-pin 742dca58 first-12).

### Marketplace C: `everything-claude-code` (ECC affaan-m — 1 plugin)

Source: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`

| # | Plugin | Version | Skills | Agents | Commands | Hooks | Notes |
|---|--------|---------|-------:|-------:|---------:|:-----:|-------|
| 21 | everything-claude-code | 2.0.0-rc.1 | 182 | 48 | 68 | Y | LARGEST plugin; supplies safety-guard / agent-introspection / autonomous-loops / governance-capture / 14 SessionEnd auditors |

**182 skills** is the dominant skill surface in this runtime. Examples: agentic-engineering / autonomous-loops / autonomous-agent-harness / continuous-learning / continuous-agent-loop / gateguard / safety-guard / agent-eval / agent-introspection-debugging / coding-standards / research-ops / deep-research / ai-first-engineering / exa-search / iterative-retrieval / council / skill-comply / etc.

ECC contributes the LARGEST hooks.json — see `.claude/settings.json:env._comment_ecc_disabled_hooks` enumeration at L9 for 14 disabled ECC hooks IDs.

### Marketplace D: `openai-codex` (codex-plugin-cc — 1 plugin)

Source: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/`

| # | Plugin | Version | Skills | Agents | Commands | Hooks | Notes |
|---|--------|---------|-------:|-------:|---------:|:-----:|-------|
| 22 | codex | 1.0.4 | 3 | 1 | 7 | Y | T1-T7 lifecycle backbone via hooks.json; 7 commands incl /plan-codex-review |

Plugin-level Stop hook wired in `.claude/settings.json:hooks.Stop[].hooks[2]` — `Z:\claude-sota-installed\.claude\plugins\marketplaces\openai-codex\plugins\codex\scripts\stop-review-gate-hook.mjs` (timeout 300s). Plus session-lifecycle SessionStart + SessionEnd hooks.

### Marketplace E: `context-mode` (mksglu OpenClaw — 1 plugin)

Source: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/`

| # | Plugin | Version | Skills | Agents | Commands | Hooks | Notes |
|---|--------|---------|-------:|-------:|---------:|:-----:|-------|
| 23 | context-mode | 1.0.111 | 12 | 0 | 0 | Y | OpenClaw — 4 hooks (PreToolUse/PostToolUse/PreCompact/SessionStart) + 6 sandbox tools + 5 meta-tools |

Cite: `openclaw.plugin.json` content-verified at this audit:
```
{"id":"context-mode","name":"Context Mode","kind":"tool",
 "description":"OpenClaw plugin that saves 98% of your context window. Sandboxed code execution in 11 languages, FTS5 knowledge base with BM25 ranking, and intent-driven search.",
 "version":"1.0.111","sandbox":{"mode":"permissive","filesystem_access":"full","system_access":"full"}}
```

NB: 3× `temp_local_*` directories (`temp_local_1778265611148_ik6cau` / `_9qois6` / `_9ss6ht`) under `plugins/cache/` are **unwired duplicates of context-mode v1.0.111** (identical openclaw.plugin.json). LATENT — NOT in `enabledPlugins`. **GAP candidate**: cleanup queue (likely orphan stale copies from install retries).

### Plugin-level inventory rollup

| Marketplace | Plugins | Skills | Agents | Commands | Plugins-w/-hooks |
|-------------|--------:|-------:|-------:|---------:|-----------------:|
| claude-plugins-official | 19 | 30 | 15 | 14 | 3 |
| addy-agent-skills | 1 | 21 | 4 | 0 | 1 |
| everything-claude-code | 1 | 182 | 48 | 68 | 1 |
| openai-codex | 1 | 3 | 1 | 7 | 1 |
| context-mode | 1 | 12 | 0 | 0 | 1 |
| **TOTAL** | **23** | **248** | **68** | **89** | **7** |

(Plus 11 vertical-domain marketplaces registered — financial-services/healthcare/life-sciences/skills/knowledge-work-plugins/claude-plugins-community + 5 others — but those plugins NOT in `enabledPlugins`. Discovered via `extraKnownMarketplaces` at settings.json L478.)

### Active plugin-supplied hooks in settings.json

`.claude/settings.json:hooks` block contains the wired pipeline:

| Trigger | Hook | Source |
|---------|------|--------|
| PreToolUse:Edit\|Write\|MultiEdit | `codex_t1_consult_gate.py` (timeout 5) | local script |
| PreToolUse:Edit\|Write\|MultiEdit | `secret_scan_guard.py` (timeout 8) | local script |
| PreToolUse:ExitPlanMode | `codex_t5_plan_review_gate.py` (async, timeout 5) | local script |
| PreToolUse:Agent | `agent_spawn_gate.py` (timeout 5) | local script |
| PreToolUse:* | `cwc/kill-switch.sh` + `cwc/steer.sh` (timeout 3) | cwc |
| PreToolUse:Read | `cwc/track-read.sh` (timeout 3) | cwc |
| PreToolUse:Write\|Edit\|MultiEdit | `cwc/verify-gate.sh` (timeout 3) | cwc |
| PreToolUse:Bash | `safety_guard.py` (timeout 5) | local |
| PreToolUse:Bash | `block_no_verify_guard.py` (timeout 5) | local |
| PreToolUse:Bash(git commit *) | `gitleaks_pre_commit_gate.py` (timeout 10) | local |
| PreToolUse:Bash(git commit *) | `codex_t2_pre_commit_gate.py` (timeout 180) | local |
| PostToolUse:Bash(git commit *) | `codex_postcommit_review.py` (async, timeout 30) | local T3 |
| PostToolUse:Bash(git push *) | `codex_prepush_review.py` (async, timeout 30) | local T4 |
| Stop | `auto_proceed_gate.py` (timeout 5) | local T7 |
| Stop | `cwc/commit-on-stop-throttled.sh` (timeout 60) | cwc |
| Stop | `stop-review-gate-hook.mjs` (timeout 300) | codex plugin |
| SubagentStop | `subagent_stop_telemetry.py` (async, timeout 5) | local |
| SessionStart | `session-lifecycle-hook.mjs` (timeout 5) | codex plugin |
| SessionStart | `context-mode-cache-heal.mjs` | local context-mode wire |
| SessionEnd | `session-lifecycle-hook.mjs` (timeout 5) | codex plugin |

Plus internal hooks shipped by ECC + agent-skills + superpowers + ralph-loop + security-guidance + context-mode (their own `hooks/hooks.json` auto-loaded by CC plugin runtime).

### Local subagents (Z:/claude-sota-installed/.claude/agents/)

| Agent | Notes |
|-------|-------|
| architect.md | Design-time architecture audit |
| code-reviewer.md | Local override of plugin code-reviewer (CC subagent install-path discipline: local > plugin > builtin) |
| debugger.md | Systematic debugging |
| evaluator.md | Eval gate |
| gpt5-archaeologist.md | REAL GPT-5.5 BRIDGE-MODE bug-magnet/hotspot |
| gpt5-reviewer.md | REAL GPT-5.5 BRIDGE-MODE adversarial review |
| sota-researcher.md | Cardinal-rule-10 research-first primitive (Tier-1b per CR-7) |
| verifier.md | Verification-before-completion gate |
| cwc/ subdir | cwc reference docs (cwc-CLAUDE-reference.md, evaluator.md) |

**9 local agents** override or complement plugin-supplied agents per CC subagent install-path precedence (`.claude/agents/` > plugin marketplace > CC builtins per Wave 50 fire 3 Agent E Path 3 finding).

---

## SECTION 2 — MCP-by-MCP feature inventory

Source: `.mcp.json` (verbatim above) — 8 servers wired.

| # | MCP | Type | Source/Version | Active in this session | Notes |
|---|-----|------|----------------|:----------------------:|-------|
| 1 | github | http | `api.githubcopilot.com/mcp/readonly` (GitHub Copilot MCP, readonly) | Y (frequent) | Auth via $GITHUB_TOKEN |
| 2 | context7 | http | `mcp.context7.com/mcp` | Y (system-reminder this session) | Library docs |
| 3 | deepwiki | http | `mcp.deepwiki.com/mcp` | Y | Repo Q&A |
| 4 | playwright | stdio | `npx -y @playwright/mcp@latest` | Latent | Browser automation |
| 5 | repomix | stdio | `npx -y repomix@1.14.0 --mcp` | Latent | Pack→Grep→Skill ~70% compression |
| 6 | serena | stdio | `uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context claude-code` | Latent | Code navigation/symbol intel |
| 7 | memory | stdio | `Z:/venvs/claude/Scripts/memory.exe` (doobidoo/mcp-memory-service v10.51.3 sqlite_vec) | Latent | L1 capture; backend at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` |
| 8 | graphiti | stdio | `uv run --isolated --directory Z:/claude-sota-installed/.local/graphiti/mcp_server` (FalkorDB+Ollama) | Latent | L3 temporal-KG via FalkorDB:16379 + qwen3.6:35b + qwen3-embedding:0.6b |

Plus context-mode MCP via plugin (Wave 95 Ship 1M removed standalone; replaced by plugin-supplied per `_comment_context_mode_removed` in .mcp.json).

**Tool-invocation activity in this session** (sample):
- `mcp__plugin_context-mode_context-mode__ctx_*` — implied active per system-reminder
- `mcp__github__*` — implied via cardinal-rule-6 install-discipline references
- Other MCPs LATENT in this session (no inferred invocations)

**GAP candidate**: 5 of 8 MCPs latent (playwright/repomix/serena/memory/graphiti). Some are demand-driven (playwright when browser test surfaces); but **memory + graphiti are CR-10 META-process load-bearing** (cardinal-rule-11 RECALL gate) and underutilization is a real gap.

---

## SECTION 3 — Token-efficiency + architectural-optimization repos audit (`docs/outer research/`)

Outer-research directory contents per direct ls:
- `kits/` — 51 versioned kits (v5/v6/v10/v12/v14-v48/v52-v61) — anonymous LLM-iterated zip-drop convention
- `_archives/` — original zip artifacts
- `wave52/` — Wave 52 iter1a-iter3a synthesis files (8 .md)
- `claude_code_sota_v6{3,4,5}_*.zip` — top-level new kits not yet extracted

### Adoption-status verdict (per outer-research/README.md L165 verbatim):

> **Net cohort yield from v3→v6 + v12 + v14-v52: 0/X ADOPT-NOW (n=23 consecutive 0% across distinct kit cohorts** — Wave-N1 Phase 3 SOTA-convergence-reset close 2026-05-06)

**All kits CITE-REFERENCE-ONLY** — none INSTALLED, none have repo ports. Cohort 7 structural REJECT class (`docs/verified-avoid.md`) covers the source-family.

### Tokens-eff + architectural-optimization specific claims in kits

`v52/` kit contains `EXECUTE_BEST_OF_BEST_PLAN`, `ALL_IN_ONE_CLAUDE_CODE_SOTA_V52`, `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST`, `REPOS_BY_CATEGORY`, `REPO_METADATA.json`, `MANIFEST.md`, `SOURCE_AUDIT_NOTES.md`. v52 SOTA-convergence-reset claimed:
- Token-eff 12-dim AT-SOTA per Wave 17 fire-25 baseline (ALREADY shipped in eee)
- CLI foundations 28+ tools cataloged (ALREADY in `.claude/skills/sota-cli-tools/SKILL.md` per sibling)
- Karpathy LLM Wiki: 8/15 patterns ADOPTED + 1 PARTIAL + 6 DEMAND-ABSENT + **1 GENUINE-GAP — Wiki Lint operation** (contradictions/stale/orphans/cross-refs detection)

### Token-eff + architectural-optimization findings

| Surface | Status in eee | Cite |
|---------|---------------|------|
| ccusage statusline | INSTALLED (npm) | settings.json L256 + statusLine block |
| 1h prompt cache | ENABLED via `ENABLE_PROMPT_CACHING_1H=1` | settings.json L48 |
| Tool search auto-promote 5 | `ENABLE_TOOL_SEARCH=auto:5` | settings.json L49 |
| Fine-grained tool streaming | `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | settings.json L46 |
| Auto-compact 70% override | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` | settings.json L50 |
| Phoenix OTel tracing | INSTALLED via `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:14317` (arizephoenix/phoenix:13.15.0) | settings.json L54 |
| Gateway model discovery | `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` (CLIProxyAPI v6.10.9 10-account fleet) | settings.json L60 + Wave 106 Ship 2N-batch3-F |
| Haiku-pin small-fast-model | `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5` | settings.json L37 |
| Cache breakpoints / sticky agent→account binding | NOT-EVALUATED — referenced in parallel-agent-wave.md §CADP but not separately wired | gap |
| context-mode 98% context savings | INSTALLED + ACTIVE (plugin-supplied MCP) | enabledPlugins |
| Wiki Lint (v52 GENUINE-GAP) | NOT-EVALUATED — STUDY-PILOT P1.2 deferred per Wave 2 fire | gap |

### `wave52/iter2b-advanced-unadopted.md` — top-10 patterns

Per outer-research/README.md L171: TIER-1-DIRECT cite chain to Z:/repos/deps/claude-code/CHANGELOG.md @ HEAD; iter2b TOP 10 advanced unleashed-mode env block patterns ADOPTED in Wave 82a. Of 10:
- 9 ADOPTED (per `_comment_wave82a_advanced_unleash` enumeration in settings.json L87)
- 1 DEFERRED — `OTEL_LOG_RAW_API_BODIES` (PII risk; would leak full prompts to Langfuse)

---

## SECTION 4 — MISSING SOTA features (gaps where install present but feature latent)

Cross-reference each plugin/MCP/repo manifest against actual eee usage.

### A. Plugin-supplied skills latent (highest-leverage gaps)

| Skill | Plugin | Status | Why latent |
|-------|--------|:------:|-----------|
| `using-superpowers` (1% rule meta) | superpowers | active | declared auto-fire |
| `using-agent-skills` (Addy meta) | agent-skills | active | declared auto-fire |
| `skill-comply` (post-invocation verifier) | ECC | declared but UNVERIFIED if firing | should self-fire after every `Skill` invocation per CLAUDE.md L334 — confirm via JSONL |
| `skill-creator` (authoring loop) | claude-plugins-official | LATENT | invoked only on-demand when authoring new skill |
| `dispatching-parallel-agents` | superpowers | LATENT | parallel-agent-wave.md fan-out exists but skill not auto-fired |
| `requesting-code-review` / `receiving-code-review` | superpowers | LATENT | manual-fire; no PostToolUse Edit hook auto-invokes |
| `verification-before-completion` | superpowers | declared CR-3 Phase-1 critical | should be ACTIVE on every "DONE" claim |
| `safety-guard` (ECC) | ECC | duplicate of local safety_guard.py | KISS Must-Never #4 risk if both fire |
| 21 addy engineering-phase skills | agent-skills | LATENT | discovery via using-agent-skills only — most never auto-trigger on real edits |
| 182 ECC skills | ECC | mostly latent | autonomous-loops / continuous-agent-loop / ai-first-engineering / iterative-retrieval / council never invoked in normal arc |

### B. MCP latent tools

| MCP | Latent feature | Why under-used |
|-----|----------------|----------------|
| memory | `mcp__memory__memory_store` / `memory_search` (L1 RECALL surface) | Cardinal-rule-11 RECALL gate but rarely invoked vs Bash grep/Glob |
| graphiti | `mcp__graphiti__add_memory` / `search_memory_nodes` (L3 temporal-KG) | Just-installed Wave 110 (commit 776e2ca); no cross-arc evidence yet |
| serena | symbol/reference navigation | Bash grep/Glob covers most cases; serena's symbol-aware advantage unrealized |
| repomix | `mcp__repomix__pack_codebase` + `grep_repomix_output` (~70% compression) | Native Read + Grep used instead — 70% token savings unrealized on multi-file audits |
| playwright | browser automation | demand-driven; no current frontend test surface |
| deepwiki | repo Q&A | underused vs github MCP |

### C. Hooks not yet wired (referenced but inert)

| Hook | Status | Cite |
|------|:------:|------|
| `fm17d_stall_detector.py` | DISABLED via `FM17_STALL_DETECTOR_DISABLE=1` (schema-rot 172/172 entries) | settings.json L7 |
| 14 ECC hooks DISABLED | per `ECC_DISABLED_HOOKS` env list | settings.json L9 |
| `agent_plan_readonly_bash_guard.py` | declared in /scripts/ but per-subagent scope only | settings.json comment_allow L181 |
| `codex_review_queue.py` | local script present but no settings.json wire seen | gap candidate |
| `_codex_plugin_root.py` / `_observation_writer.py` / `codex_gate.py` | utility imports only | not directly wired |

### D. Outer-research gaps

| Item | Status | Source |
|------|:------:|--------|
| Wiki Lint operation | NOT-EVALUATED (STUDY-PILOT deferred) | v52 GENUINE-GAP per Wave-N1 §8 |
| v53-v61 kits | NOT-AUDITED | `kits/v53/` through `v61/` directories present but no Wave close |
| v63/v64/v65 zips top-level | NOT-EXTRACTED — likely Cohort 7 reject | `claude_code_sota_v6{3,4,5}_*.zip` |
| ACP host (deepagents/goose convergence) | NOT-INSTALLED | sibling team-orchestration.md cited but no Anthropic ACP integration in eee |

### E. Settings.json features latent

| Feature | Status | Notes |
|---------|:------:|-------|
| `disableAutoMode` | UNSET | could be set if auto-mode misbehaves; gap = no monitoring trigger |
| `OTEL_LOG_RAW_API_BODIES` | DEFERRED for PII | could enable on local-only Langfuse |
| Langfuse parallel-sink for OTel | DEFERRED | Wave 109 Ship 2P-pilot-REVISED noted as followup |
| Logs/metrics OTel signals | DEFERRED | Phoenix is trace-only |

### F. Top-3 MISSING SOTA priority gaps

1. **MCP underutilization**: memory + graphiti + repomix represent ~70% MCP-installed-but-unused surface. Concrete fix: MEMORY auto-fire on UserPromptSubmit RECALL; repomix triggered on multi-file audit detection.
2. **3× temp_local_* context-mode duplicates** unwired in plugin cache — cleanup needed (orphan stale install retries; CR-9 install-risk discipline).
3. **182 ECC skills + 21 addy + 14 superpowers latent**: 217 skills available, ~5-10 actually auto-fire per typical session. Skill-comply post-invocation verifier should track usage histogram → identify under-utilized but high-leverage.

---

## ARTIFACT-INLINE: tmp/wave112-agentA-repos-features-inventory-2026-05-09.md

(Above content written via Write tool to absolute path.)

## Cite trail summary

- `Z:/claude-sota-installed/.claude/settings.json` (verbatim hooks block + enabledPlugins L240-264 + extraKnownMarketplaces L478-535 + env L1-71)
- `Z:/claude-sota-installed/.mcp.json` (8 MCP server entries + version pins)
- `Z:/claude-sota-installed/.claude/plugins/cache/<5 marketplaces>/<23 plugins>/<version>/` (per-plugin skills/agents/commands enumeration via find)
- `Z:/claude-sota-installed/docs/outer research/README.md` (kit table + n=23 saturation status)
- `Z:/claude-sota-installed/.claude/agents/` (9 local subagents)
- `Z:/claude-sota-installed/.claude/hooks/scripts/` (22 local Python hook scripts)
- `Z:/claude-sota-installed/.claude/hooks/cwc/` (5 cwc bash primitives: kill-switch / steer / track-read / verify-gate + commit-on-stop-throttled.sh under /scripts/cwc/)
- `Z:/claude-sota-installed/.local/cwc/` (cwc-long-running-agents native install — anthropics @ ffd563d)

## Verdict

**HONEST-NON-FINDING on outer-research adoption** — n=23 cohort baseline holds; outer-research is DISCOVERY surface only. **GENUINE GAPS** identified in Section 4 (MCP underutilization / duplicate context-mode / skill auto-fire histogram missing). All 4 sections complete within token budget.

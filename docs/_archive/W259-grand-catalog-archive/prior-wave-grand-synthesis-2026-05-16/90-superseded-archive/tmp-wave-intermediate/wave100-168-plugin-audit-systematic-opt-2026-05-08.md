# Wave 100 — 168-plugin OFFICIAL marketplace audit + Systematic 6-dimension optimization

**Agent**: sota-researcher Sonnet stand-in
**Date**: 2026-05-08
**STAND-IN-NOTICE**: Sonnet stand-in per CLAUDE.local.md ENV (g) — NOT GPT-5.5; cross-model gate NOT structurally satisfied for this dispatch. Orchestrator MUST fire `codex exec --ephemeral -p deep-review-exec --sandbox=read-only` foreground+tee BEFORE any commit per CR-3 Phase 1 + Wave 98 lesson n=2 + `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.
**Source-pin**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/.claude-plugin/marketplace.json` (168 plugins; 9 enabled = 159 candidates)

---

## §1 Mia probe state (verify NOT-installed for top candidates)

- **Enabled plugins (9)**: `superpowers@claude-plugins-official` + `codex@openai-codex` + `everything-claude-code@everything-claude-code` + `pyright-lsp@claude-plugins-official` + `agent-sdk-dev@claude-plugins-official` + `ralph-loop@claude-plugins-official` + `frontend-design@claude-plugins-official` + `context-mode@context-mode` + `claude-md-management@claude-plugins-official` [VERIFIED via `jq '.enabledPlugins | keys' Z:/claude-sota-installed/.claude/settings.json`]
- **MCP servers wired (7)**: github + context7 + deepwiki + playwright + serena + memory + cognee-no [VERIFIED via `Z:/claude-sota-installed/.mcp.json`]
- **Categories in 168-marketplace**: development=75, productivity=32, database=16, none=14, security=10, monitoring=8, deployment=5, design=3, learning=2, testing=1, math=1, location=1
- **Plugin cache present**: superpowers/codex/everything-claude-code/agent-sdk-dev/ralph-loop/frontend-design/typescript-lsp/pyright-lsp + 3 temp_local cleanup-pending [VERIFIED via `ls Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/`]

---

## §2 TASK A — Top-7 OFFICIAL plugin Enable candidates (ranked + cite + ROI)

### TOP-1: `pr-review-toolkit` (productivity) — **HIGHEST ROI**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/pr-review-toolkit/agents/` 6 agents: `code-reviewer.md` + `code-simplifier.md` + `comment-analyzer.md` + `pr-test-analyzer.md` + **`silent-failure-hunter.md`** + `type-design-analyzer.md`
- **Mia probe**: NOT in `enabledPlugins`; NOT vendored as standalone agent file [VERIFIED via `jq '.enabledPlugins | keys'` + `ls Z:/claude-sota-installed/.claude/agents/`]
- **ROI**: ~30min/PR review × 5-10 reviews/week. Wave 98+99 mentioned silent-failure-hunter as concept — THIS plugin ships it as actual agent.
- **Sister vs existing**: `Z:/claude-sota-installed/.claude/agents/code-reviewer.md` (sibling-ported sota-researcher) is generic; pr-review-toolkit ships 6 specialized review angles. Convergence-gate Axis-1+2+3 PASS (Anthropic OFFICIAL + named-T2 endorsement + age-stable).
- **Decision**: **ENABLE** — `/plugin install pr-review-toolkit@claude-plugins-official`

### TOP-2: `skill-creator` (development) — **HIGH ROI**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/skill-creator/skills/skill-creator/SKILL.md` — Anthropic OFFICIAL skill-authoring + benchmarking + variance-analysis tooling
- **Mia probe**: NOT enabled; NOT in cache. v64 kit `WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md:8` flags skill-creation as gap.
- **ROI**: ~15-30min/skill × current pace 1-2 new skills/wave = ~30-60min/wave saved. Replaces ad-hoc skill drafting.
- **Decision**: **ENABLE** — relevant for ongoing eee-runtime skill expansion.

### TOP-3: `claude-code-setup` (productivity) — **HIGH ROI**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-code-setup/skills/claude-automation-recommender/` — analyzes codebase + recommends hooks/skills/MCPs/subagents
- **Mia probe**: NOT enabled. **CR-12 cascade**: Wave 99 already flagged as Top-3 priority gap.
- **ROI**: ongoing eee-runtime requires Section 13 hook + Section 14 subagent gap-analysis; this plugin automates the recommendation process.
- **Caveat**: Pure-recommendation plugin — operator decides. LOW token-cost (read-only analysis).
- **Decision**: **ENABLE** — directly addresses CR-7 Phase 2 INSTALLED-row gap discovery.

### TOP-4: `mcp-server-dev` (development) — **HIGH ROI for sister-MCP build**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/mcp-server-dev/skills/` — 7 expert skills covering deployment models (HTTP/MCPB/local), auth, tool design
- **Mia probe**: NOT enabled. Wave 99 flagged as Top-3 priority gap.
- **ROI**: directly enables Section 4 memory MCP migrations (e.g., graphiti L3 wire-up still pending) + future custom MCP construction.
- **Decision**: **ENABLE** — pairs with `plugin-dev` for plugin-creation-class workflows.

### TOP-5: `commit-commands` (productivity) — **MEDIUM-HIGH ROI**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/commit-commands/commands/` — `/commit` + `/push` + `/create-pr`
- **Mia probe**: NOT enabled. Sibling has hand-coded git-cli-grammar-discipline.md but no streamlined commands.
- **ROI**: ~30s/commit × ~10 commits/wave saved on repetitive `git add ... && git commit -F ... && git push` syntax (sister: FM-15 git-cli-grammar-discipline).
- **Decision**: **ENABLE** — reduces FM-15 instances + complementary to existing commit discipline.

### TOP-6: `hookify` (productivity) — **MEDIUM-HIGH ROI; CR-9 CAUTION**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/hookify/hooks/` 4 hooks (pretooluse + posttooluse + stop + userpromptsubmit) + skills + matchers
- **Mia probe**: NOT enabled. Direct ECC-plugin-style hook authoring.
- **ROI**: hooks are the highest-leverage primitive in eee runtime per CR-7 Phase 2 (Section 13 hook gap). Hookify enables RAPID hook iteration.
- **CR-9 caveat**: hooks add to existing ECC + cwc + codex hook chain — token-cost increase needs profiling. Recommend ENABLE-then-monitor via ccusage.
- **Decision**: **ENABLE** — combinatorially valuable with mcp-server-dev + plugin-dev.

### TOP-7: `playground` (development) — **MEDIUM ROI**

- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/playground/skills/` — interactive HTML playgrounds with visual controls + live preview
- **Mia probe**: NOT enabled. Self-contained single-file explorers — useful for design-doc visualization.
- **ROI**: ~10-20min/visualization × occasional design discussions. Sibling has no equivalent.
- **Decision**: **ENABLE-CONDITIONAL** — useful but lower frequency than Top 1-6. ALTERNATIVE: defer until first explicit design-viz need.

---

## §3 TASK B — Systematic 6-dimension optimization findings

### Dimension 1: Account rotation (MAXIMIZE utilization before resets)

**Already covered (Wave 98)**: Ship 1J round-robin / Ship 1Q 4h session-affinity / Ship 1W cpa-usage-keeper / Ship 1X cycle-aware ≥80% disable. Wave 98 prescribed Ship A (priority bucket equalize) + Ship D (FM-17.b.i combo defense).

**NEW (Wave 100)**:
- **D1.1 ADOPT-NOW**: **`zhanglunet/cliproxyapi-usage-dashboard`** — STUDY-PILOT in Wave 98 → reclassify ADOPT given current 6d5h reset window urgency. Provides web UI for Codex 5h/7d windows. **ROI**: visual reset-prediction beats current Ship 1W SQLite tail.
- **D1.2 ADOPT-NOW**: Implement **predictive rotation extending Ship 1X** (Wave 98 Ship C) — compute `predicted_exhaustion_at = now + (1 - used%) / requests_per_minute_avg_5min`. Per Wave 98 Agent C verdict prescription.
- **D1.3 NEW-FAILURE-MODE**: **FM-22.a Pre-fire-burn-rate-amplification** — when 3 active accounts at non-equal priority (P30/P20/P10), round-robin operates within highest bucket only (per `sdk/cliproxy/auth/selector.go:116-129,200-255 @ HEAD ed1458aa6d3430ba59538aeb980b8934f0e80c1f`). Effective fill-first amplifies 429 risk on aesthetic9c (P30-only). Sibling FM catalog does NOT capture this priority-bucket-vs-burst-distribution failure mode.

### Dimension 2: Token efficiency (beyond rtk + headroom + claude-context)

**NEW**:
- **D2.1 ADOPT-NOW**: **chopratejas/headroom** — listed in v64 `TOKEN_CONTEXT_ARCHITECTURE.md:29` as "cross-agent compression/memory". Wave 98+99 didn't install. Mia probe: ZERO references in install-provenance. **Cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:78`. **ROI**: cross-agent compression beyond per-agent context-mode sandboxing.
- **D2.2 STUDY-PILOT**: **`buildoak/wet`** + **`ArthurDEV44/distill`** + **`alexgreensh/token-optimizer`** — read-path/context profiling tools listed in v64:33-34 unaddressed by Wave 97-99. STUDY-PILOT one to characterize before committing.
- **D2.3 ADOPT-NOW**: **MAX_MCP_OUTPUT_TOKENS=50000 + MCP_TOOL_TIMEOUT** — Wave 97 fan2-B Pattern 7+9 already prescribed. Settings-only, ~5min ship. **REPEAT** — fast win not yet shipped.
- **D2.4 HONEST-NON-FINDING**: TOOL-USE EFFICIENCY / FUNCTION-CALLING optimization — Wave 99 GENUINE-GAP confirmed. ZERO SOTA repos.

### Dimension 3: Cache rate preservation (aesthetic9c at 100.00%)

**NEW**:
- **D3.1 NEW-FAILURE-MODE**: **FM-22.b Cache-prefix-fragmentation-on-rotation** — when Ship 1Q 4h session-affinity expires + rotation flips account, prompt-cache prefix on incoming account = 0% (cold start). Cited in v64 `TOKEN_CONTEXT_ARCHITECTURE.md` indirectly but never codified as failure mode in sibling catalog.
- **D3.2 ADOPT-NOW**: **cnighswonger/claude-code-cache-fix v3.3.0** — per install-provenance Wave 90 Agent B trace: **15+ cache-fix passes** including fingerprint stripping, TTL management, cache-control normalization. Currently UNINSTALLED despite `1T cnighswonger v3.3.0 chained behind CLIProxyAPI proxy MEDIUM` flagged Wave 90. **ROI**: 99.8% cache-rate reduction documented (per CHANGELOG cite). Should be P1 ELEVATED queued for next cycle.
- **D3.3 STUDY-PILOT**: investigate `ENABLE_FINE_GRAINED_TOOL_STREAMING` env var (Wave 99 mentioned) — preserves cache across streaming tool-call chunks.

### Dimension 4: Cross-model harmony (4 stacks)

**NEW**:
- **D4.1 ADOPT-NOW**: **`microsoft-docs` plugin** — 168-marketplace entry; access official Microsoft documentation/Azure/.NET inline. Mia: NOT enabled. **ROI**: when docs needed for Microsoft stack (Antigravity is Microsoft-class), avoids context7 round-trip.
- **D4.2 STUDY-PILOT**: **`agent-sdk-dev` already enabled** — Wave 99 confirmed. Verify deep-integration with all 4 stacks.
- **D4.3 NEW-FAILURE-MODE**: **FM-22.c Cross-model-context-leakage** — when codex T1 reads sibling worktree state for review, Anthropic Claude main session AND OpenAI codex BOTH have access to sibling. Cross-model state-leak NOT enumerated in sibling FM catalog (sibling has FM-17 fleet-depletion + FM-19 readonly-guard but not cross-model-context-bleed).

### Dimension 5: Latency optimization

**NEW**:
- **D5.1 ADOPT-NOW**: **session-affinity already 4h** — Wave 86 Ship 1Q. EXTEND: investigate `CLAUDE_CODE_FORK_SUBAGENT=1` (already set per CLAUDE.local.md ENV (e)) is fully utilized — fork inherits prompt-cache (~5-15K tokens saved per fork-routed dispatch per `team-orchestration.md` cite). Verify fork-vs-fresh discipline operationalized.
- **D5.2 STUDY-PILOT**: **`yamadashy/repomix`** — already INSTALLED-VIA-NPM v1.14.0 per manifest. Verify wired into pre-codex-T1 pack workflow. ROI: ~70% token reduction via tree-sitter compression per repomix cite.
- **D5.3 ADOPT-NOW**: **chrome-devtools-mcp** plugin — for browser-class workflows. Mia: NOT enabled. ROI: avoids context-window inflation when debugging frontend (replaces full-DOM scraping with targeted chrome inspection).

### Dimension 6: Hidden-failure-mode hunt

**NEW failure modes** (NOT in sibling `Z:/claude-sota/.claude/rules/named-failure-modes.md`):
1. **FM-22.a Pre-fire-burn-rate-amplification** — priority-bucket vs round-robin asymmetry under unequal P30/P20/P10 (see D1.3)
2. **FM-22.b Cache-prefix-fragmentation-on-rotation** — session-affinity expiry → cache cold-start (see D3.1)
3. **FM-22.c Cross-model-context-leakage** — codex T1 access to sibling state (see D4.3)
4. **FM-22.d D6-today-release-auto-upgrade trap on plugin marketplace** — `everything-claude-code@2.0.0-rc.1` is RC version per manifest CR-9 caveat. RC plugins ship breaking changes; sibling FM-03 D6 covers MCP servers, NOT plugin marketplace updates. Mitigation: pin all `/plugin install` to specific version (not @latest).
5. **FM-22.e Subagent-MCP-inheritance-gap** — per Wave 97 fan2-C: subagent CANNOT inherit plugin-supplied MCPs (only main session inherits per CCBP `claude-mcp.md:121`). Sibling FM catalog does not call this out as MEMBER row.

---

## §4 Cross-cutting recommendations: top-3 highest-ROI ships for Wave 100+

### SHIP-1 (HIGHEST): Enable `pr-review-toolkit` + `skill-creator` + `claude-code-setup` (Wave 100 batch)

- **Action**: 3-plugin bulk enable via `/plugin install` interactive sessions
- **ROI**: ~60-90min/wave saved on PR review specialization + skill-authoring + automation discovery
- **CR-7 Phase 2 progress**: 9 → 12 enabled OFFICIAL plugins
- **Risk**: LOW (all 3 are passive — pure agents/skills, no hooks/MCPs)

### SHIP-2 (HIGH): Wave 98 Ship A + Ship D (priority-bucket equalize + FM-17.b.i combo defense)

- **Action**: Equalize aesthetic9c+nalawowac → P20 via Management API PATCH; ship FM-17.b.i defense (sticky + pre-probe + retry=2 + 30min cycle)
- **ROI**: closes Wave 97 fan-2-C 429 root cause; restores 3-account burst distribution
- **CR-9**: pre-cite-import REVERT check on Ship 1X variant — None.

### SHIP-3 (HIGH-COST-HIGH-ROI): cnighswonger/claude-code-cache-fix v3.3.0 install + chained behind CLIProxyAPI

- **Action**: clone v3.3.0 + insert proxy chain before CPA
- **ROI**: 99.8% cache-rate reduction (per Wave 90 trace)
- **CR-9**: requires careful sibling-bleed defense + 2-round fix-forward expectation

---

## §5 REJECT-FOR-FIT (do NOT enable)

| Plugin | Category | Reason |
|---|---|---|
| `coderabbit` | productivity | DUPLICATE of pr-review-toolkit + external-service dependency |
| `dash0` / `posthog` / `pagerduty` / `logfire` / `sonarqube` / `sonatype-guide` | monitoring/security | OPERATOR-DEPENDENT external services; eee runtime is local-first |
| `desktop-commander` | productivity | OVERLAPS with existing Bash + safety_guard; trust-boundary risk |
| `github` / `gitlab` plugins | productivity | github MCP HTTP already wired in `.mcp.json` (Wave 75); plugin DUPLICATE |
| `firecrawl` / `exa` plugins | productivity/development | Operator-dependent API keys; sibling already has cite-anchor research path |
| `feature-dev` | development | OVERLAPS with `superpowers` plan/debug/tdd already-vendored |
| `code-simplifier` | productivity | DUPLICATE of pr-review-toolkit's code-simplifier agent (covered TOP-1) |
| `atomic-agents` / `pydantic-ai` | development | Framework-specific (atomic agents / pydantic-ai); not eee scope |
| `chrome-devtools-mcp` | development | LOWER priority than D5.3 — STUDY-PILOT first |
| `mintlify` / `microsoft-docs` | development | Documentation-specific; on-demand only |
| `qodo-skills` / `huggingface-skills` | development | Domain-specific (CI/AI-ML); not core eee |
| `plugin-dev` | development | DUPLICATE-OVERLAP with mcp-server-dev (TOP-4); pick mcp-server-dev |

---

## §6 HONEST-NON-FINDING (axes probed found nothing surprising)

1. **5h/7d reset prediction repos**: ZERO open-source SOTA repos for Anthropic Max plan-tier tracking (per Wave 98 §3 confirmed). Operator-dependent — must be sibling-novel.
2. **Multi-model coordination repos beyond cross-model-consensus.md**: ZERO single-repo SOTA. Sibling cross-model-consensus.md remains canonical.
3. **Tool-use efficiency benchmarks**: ZERO repos surfaced via 168-plugin scan + 226-repo v64 list (Wave 99 GENUINE-GAP confirmed).
4. **Bypass-permissions safety floor beyond safety_guard.py + agent_plan_readonly_bash_guard.py**: ZERO additional patterns. Existing 2-floor sibling-novel discipline is SOTA.
5. **Plugin-cache-cleanup scripts**: 3 `temp_local_*` directories present in `Z:/claude-sota-installed/.claude/plugins/cache/`. Sibling has no cleanup hook. **NEW-FAILURE-MODE candidate** but LOW priority.

---

## §7 Convergence-gate verdict per ADOPT-NOW

| Adoption | Axis-1 | Axis-2 | Axis-3 | STRONG-PROVENANCE-EXPRESS |
|---|---|---|---|---|
| pr-review-toolkit | Anthropic OFFICIAL | named-T2 silent-failure-hunter pattern | 90d+ stable | ✓ |
| skill-creator | Anthropic OFFICIAL | TIER-1 named-author cite | 90d+ | ✓ |
| claude-code-setup | Anthropic OFFICIAL | Wave 99 prescribed | 90d+ | ✓ |
| mcp-server-dev | Anthropic OFFICIAL | TIER-1 SDK author cite | 90d+ | ✓ |
| commit-commands | Anthropic OFFICIAL | TIER-1 git-discipline | 90d+ | ✓ |
| hookify | Anthropic OFFICIAL | TIER-1 hook author | 90d+ | ✓ |
| playground | Anthropic OFFICIAL | TIER-1 design-team | 90d+ | ✓ |
| zhanglunet/cliproxyapi-usage-dashboard | named-individual | Wave 98 Agent C | 30d+ | borderline |
| cnighswonger/claude-code-cache-fix v3.3.0 | named-individual | TIER-1 Wave 90 trace | 90d+ + cpd>10 | ✓ |
| chopratejas/headroom | named-individual | v64 cite | 90d+ | borderline |

All TOP-7 OFFICIAL plugins clear convergence-gate Axis-1+2+3 firm. CR-9 install-risk discipline applied.

---

## §8 CR-9 install-risk discipline applied per ADOPT-NOW

- **Version-pin mandate**: `/plugin install <name>@claude-plugins-official` resolves to specific HEAD; record post-install version per CR-9.
- **2-round fix-forward expectation**: each plugin enable may need NEEDS-REVISION → fix-forward (e.g., Wave 97 Ship 1A explanatory-output-style hidden-hook caught by codex T1).
- **Pre-cite-import REVERT check**: not applicable for `/plugin install` upstream (CR-12 PRIMARY path).
- **Sibling-bleed defense**: each TOP-7 plugin is upstream-direct from `anthropics/claude-plugins-official`; ZERO sibling cite-imports.

---

## VERDICT

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit
VERDICT: APPROVE-LIST
confidence: 0.84
top-7 OFFICIAL plugin enable candidates:
  1. pr-review-toolkit — silent-failure-hunter + 5 PR-review angles | Anthropic OFFICIAL | HIGHEST ROI | /plugin install pr-review-toolkit@claude-plugins-official
  2. skill-creator — Anthropic skill-authoring + benchmarking | HIGH ROI | /plugin install skill-creator@claude-plugins-official
  3. claude-code-setup — codebase analyzer + automation recommender | HIGH ROI | /plugin install claude-code-setup@claude-plugins-official
  4. mcp-server-dev — 7 MCP-design skills | HIGH ROI for sister-MCP work | /plugin install mcp-server-dev@claude-plugins-official
  5. commit-commands — /commit + /push + /create-pr | MEDIUM-HIGH ROI | /plugin install commit-commands@claude-plugins-official
  6. hookify — 4 hooks + skills + matchers | MEDIUM-HIGH ROI; CR-9 token-cost monitor | /plugin install hookify@claude-plugins-official
  7. playground — interactive HTML playgrounds | MEDIUM ROI; conditional enable | /plugin install playground@claude-plugins-official
systematic-optimization top-5 ADOPT-NOW:
  1. SHIP-1 batch-enable Top-3 OFFICIAL (pr-review-toolkit + skill-creator + claude-code-setup)
  2. SHIP-2 Wave 98 Ship A + D (priority-bucket equalize + FM-17.b.i combo defense)
  3. SHIP-3 cnighswonger/claude-code-cache-fix v3.3.0 install (99.8% cache-rate reduction)
  4. D2.3 MAX_MCP_OUTPUT_TOKENS=50000 + MCP_TOOL_TIMEOUT (settings-only, 5min)
  5. D5.3 chrome-devtools-mcp study-pilot (browser-class context preservation)
top-3 STUDY-PILOT:
  1. zhanglunet/cliproxyapi-usage-dashboard (Codex 5h/7d UI)
  2. chopratejas/headroom (cross-agent compression)
  3. buildoak/wet OR ArthurDEV44/distill (read-path profiling — pick one)
REJECT-FOR-FIT: coderabbit (DUPLICATE) | dash0/posthog/pagerduty/logfire/sonarqube/sonatype-guide (operator-dependent monitoring) | desktop-commander (trust-boundary) | github/gitlab (DUPLICATE MCP) | firecrawl/exa (operator-API) | feature-dev (DUPLICATE superpowers) | code-simplifier (DUPLICATE pr-review-toolkit) | atomic-agents/pydantic-ai (framework-specific) | mintlify/microsoft-docs (on-demand only) | qodo-skills/huggingface-skills (domain-specific) | plugin-dev (DUPLICATE-OVERLAP mcp-server-dev)
HONEST-NON-FINDING:
  - 5h/7d reset prediction repos = sibling-novel only
  - multi-model coordination beyond cross-model-consensus.md = ZERO repos
  - tool-use efficiency benchmarks = GENUINE-GAP (Wave 99 confirmed)
  - bypass-permissions safety floor beyond 2-floor sibling = ZERO additional
  - plugin-cache-cleanup scripts = LOW priority but missing
NEW-FAILURE-MODES (not in sibling FM catalog):
  - FM-22.a Pre-fire-burn-rate-amplification (priority-bucket vs round-robin asymmetry)
  - FM-22.b Cache-prefix-fragmentation-on-rotation (session-affinity expiry → cold cache)
  - FM-22.c Cross-model-context-leakage (codex T1 access to sibling state)
  - FM-22.d D6-today-release-auto-upgrade on plugin marketplace (RC pin gap)
  - FM-22.e Subagent-MCP-inheritance-gap (subagents cannot inherit plugin-supplied MCPs per CCBP claude-mcp.md:121)

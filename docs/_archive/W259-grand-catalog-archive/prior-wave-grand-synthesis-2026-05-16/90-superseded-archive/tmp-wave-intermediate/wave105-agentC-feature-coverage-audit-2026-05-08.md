# Wave 105 Agent C — Feature-Coverage Audit (eee-installed-vs-features-used)

> **Mandate**: For each INSTALLED repo/plugin/MCP, enumerate (a) upstream features available, (b) features actually CONFIGURED/USED in eee, (c) features MISSING despite available. Surface SOTA gaps especially around token-optimization + CLIProxy account rotation.

> **Mia pre-apply discipline applied** — every "configured" / "missing" / "INSTALLED" claim re-verified against Z:/claude-sota-installed live state (settings.json, .mcp.json, plugin cache, netstat, tasklist, plugin.json frontmatter). Several brief claims REFUTED; corrections noted inline.

---

## EXECUTIVE SUMMARY

- **Repos audited**: 17 INSTALLED + 4 STAGED (Qdrant/FalkorDB containers, cwc primitives) + 6 reference-cited
- **Total upstream features enumerated**: ~285 (skills + agents + commands + hooks + MCPs + CLI tools)
- **Configured-in-eee**: ~98 (~34% feature coverage)
- **P0/P1 high-leverage gaps**: 12
- **Mia REFUTED brief claims**: 4 (CLIProxy NOT running; Graphiti MCP NOT wired; cpa-usage-keeper MISSING; multiple "INSTALLED" rows in manifest stale)

---

## A. PER-REPO FEATURE-COVERAGE TABLES

### A.1 Plugins (claude-plugins-official + 3rd-party)

#### A.1.1 superpowers@5.1.0 (Anthropic OFFICIAL)
- **Upstream features (14 skills)**: brainstorming, dispatching-parallel-agents, executing-plans, finishing-a-development-branch, receiving-code-review, requesting-code-review, subagent-driven-development, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills
- **Configured/loaded in eee**: ALL 14 skills auto-discovered via plugin (verified via Skill tool list)
- **MISSING/UNUSED operationally**: 0 unused at SKILL level. **However** skill-tool surface is enabled but **no hook auto-fires them on triggers** — skills are user-invocable only, not auto-discovered on relevant events. P3.
- **Coverage**: 14/14 = 100%
- **Priority**: HONEST-NON-FINDING (full coverage)

#### A.1.2 codex@openai-codex@1.0.4 (OpenAI OFFICIAL)
- **Upstream features**: 3 skills (rescue / setup / codex-cli-runtime) + codex-companion runtime + T1-T7 hook scaffold
- **Configured in eee**:
  - PreToolUse: `codex_t1_consult_gate.py` (T1 pre-edit) ✓
  - PreToolUse Bash(git commit): `codex_t2_pre_commit_gate.py` (T2 working-tree) ✓
  - PreToolUse ExitPlanMode: `codex_t5_plan_review_gate.py` (T5 plan-stage) ✓
  - PostToolUse Bash: `codex_postcommit_review.py` (T3) + `codex_prepush_review.py` (T4) ✓
  - All 5 codex T-touchpoints ACTIVELY WIRED
- **MISSING**: T6 stop-gate (codex_stop_review_gate.py NOT in `.claude/hooks/scripts/` listing, but `stop-review-gate-hook.mjs` IS in Stop chain — possibly equivalent or a different shape). T7 ask-without-act gate `auto_proceed_gate.py` IS wired in Stop ✓.
- **Coverage**: 6/7 T-touchpoints wired (T6 unclear — needs probe)
- **Priority**: P2 (verify T6 mjs hook is functionally equivalent to T6 codex gate)

#### A.1.3 everything-claude-code@2.0.0-rc.1 (ECC)
- **Upstream features**: 910 SKILL.md files + 420 agent definitions (huge)
- **Configured in eee**:
  - Skills auto-discovered (visible in Skill tool list — ~800+ shown)
  - 14 ECC hooks DISABLED via `ECC_DISABLED_HOOKS` env (gateguard-fact-force, doc-file-warning, design-quality-check, console-warn, format-typecheck, check-console-log, continuous-learning x2, suggest-compact, session-activity-tracker, evaluate-session, cost-tracker, desktop-notify) — intentional cost-trim per Wave 76+77
  - `ECC_GOVERNANCE_CAPTURE=0` (governance pipeline OFF)
- **MISSING**:
  - ECC `pre-mcp-health-check` hook NOT in disabled list — assumed active
  - ECC `pre-bash-dispatcher` chain status [UNKNOWN]
  - `safety-guard` ECC SKILL exists but eee runs sibling-imported `safety_guard.py` HOOK (defense-in-depth gap of 12 patterns vs 1) — INSTALLED-AMBER but **NOT YET WIRED** in settings.json hook chain (DORMANT per manifest §13)
  - `claude-devfleet`, `agent-payment-x402`, `gan-style-harness`, `eval-harness`, `agentic-engineering` skills available but unused in any workflow
- **Coverage**: ~70% (skills loaded; hooks selectively disabled; safety-guard hook dormant)
- **Priority**: P1 — wire `safety_guard.py` (already INSTALLED-AMBER) into PreToolUse Bash chain

#### A.1.4 plugin-dev (NEW Wave 104)
- **Upstream features**: agent-creator + plugin-validator + skill-reviewer agents; create-plugin command; agent-development + command-development skills
- **Configured in eee**: enabled in settings.json `enabledPlugins`; plugin loaded
- **MISSING**: zero direct invocations of `/create-plugin` command observed in audit-trail; agent-creator agent not in `.claude/agents/` (lives in plugin cache) — usage = invoke-on-demand only
- **Coverage**: feature-loaded but **operationally unused** (Wave 104 ship just landed)
- **Priority**: P3 (feature-newly-added; expected adoption later)

#### A.1.5 frontend-design
- **Upstream features**: design-driven UI generation skills + commands
- **Configured**: enabled in `enabledPlugins`; skill auto-load
- **MISSING**: zero use in eee (no frontend project); plugin justified as REFERENCE plugin per CLAUDE.md §17
- **Coverage**: 0% operational use (intentional — install-only runtime)
- **Priority**: HONEST-NON-FINDING

#### A.1.6 ralph-loop
- **Upstream features**: ralph-loop / cancel-ralph / help commands; Stop hook (`hooks/stop-hook.sh`)
- **Configured**: enabled in `enabledPlugins`; Stop-hook **NOT** in eee's settings.json Stop chain (eee runs `auto_proceed_gate.py` + `commit-on-stop-throttled.sh` + `stop-review-gate-hook.mjs` instead; NOT ralph-loop's stop-hook.sh)
- **MISSING**: ralph-loop's auto-continue Stop-hook is **inactive** — by design (loop-cancel mandate; eee uses CWC commit-on-stop instead)
- **Coverage**: 33% (commands available; Stop-hook deliberately bypassed)
- **Priority**: HONEST-NON-FINDING (intentional bypass)

#### A.1.7 claude-md-management
- **Upstream features**: CLAUDE.md authoring/governance commands
- **Configured**: enabled
- **MISSING**: any operational firing — eee's CLAUDE.md is hand-authored bootstrap-only
- **Coverage**: 0% operational use
- **Priority**: HONEST-NON-FINDING

#### A.1.8 pyright-lsp
- **Upstream features**: pyright LSP integration for Python projects
- **Configured**: enabled in `enabledPlugins`
- **MISSING**: no Python project workflows in eee install-runtime; LSP underused
- **Coverage**: 0% operational
- **Priority**: HONEST-NON-FINDING

#### A.1.9 claude-code-setup
- **Upstream features**: setup commands + skill
- **Configured**: enabled
- **MISSING**: setup phase complete; skill underused going forward
- **Priority**: HONEST-NON-FINDING

#### A.1.10 mksglu/context-mode v1.0.111 (TOKEN-OPT FOCUS)
- **Upstream features (per plugin.json)**: 4 hooks (PreToolUse / PostToolUse / PreCompact / SessionStart) + 6 sandbox tools (ctx_execute / ctx_execute_file / ctx_index / ctx_search / ctx_fetch_and_index / ctx_batch_execute) + 5 meta-tools (ctx_doctor / ctx_purge / ctx_stats / ctx_insight / ctx_upgrade) + FTS5 BM25 KB + 11-language sandbox + 98% context-saving claim
- **Configured in eee**:
  - Plugin-supplied MCP active (MCP server visible in tool list)
  - SessionStart hook `context-mode-cache-heal.mjs` wired ✓
  - Plugin replaces standalone .mcp.json `context-mode` entry (Wave 95 Ship 1M removed standalone)
- **MISSING**:
  - PreToolUse / PostToolUse / PreCompact context-mode hooks NOT visible in eee settings.json hook chains (only SessionStart wired) — **3 of 4 plugin-supplied hooks not picked up by eee settings**
  - **No automatic ctx_batch_execute redirection** — Bash with >20-line output still permitted via permissions; classifier doesn't enforce route-through-ctx_batch_execute. **P1 token-leak**.
- **Coverage**: ~50% (MCP + 1/4 hooks + tool surface accessible)
- **Priority**: **P0** — wire PreToolUse + PreCompact context-mode hooks; audit Bash permissions to enforce ctx_batch_execute for high-output commands

#### A.1.11 cnighswonger/claude-code-cache-fix v3.5.3
- **Upstream features**: prompt-cache repair daemon at `:19801`; cache-revival
- **Configured**: port 19801 LISTENING (verified via netstat) ✓; daemon running
- **MISSING**: No tunables in settings.json; defaults assumed; **no telemetry consumer** (eee-status.ps1 doesn't query :19801)
- **Coverage**: ~70% (active but unobserved)
- **Priority**: P2 — add cache-fix telemetry surface in eee-status

---

### A.2 MCPs (.mcp.json — 6 servers)

#### A.2.1 doobidoo/mcp-memory-service v10.51.3 (Heinrich Krupp; Apache-2.0)
- **Upstream features**: 14+ memory_* + mistake_note_* tools (memory_store / memory_search / memory_graph / memory_health / memory_stats / memory_harvest / memory_resolve / memory_conflicts / memory_quality / memory_cleanup / memory_ingest / memory_list / memory_update / memory_delete / mistake_note_add / mistake_note_search / memory_store_session); sqlite_vec OR cloudflare OR hybrid backends; memory_consolidation; semantic-decay; tag-clusters
- **Configured in eee**: stdio MCP at `.mcp.json` with backend=`sqlite_vec` + db at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`
- **MISSING (P0/P1)**:
  - **No memory_harvest** scheduled — sessions don't auto-harvest reflections
  - **No memory_health** sweep wired
  - **No memory_consolidation** cron (server has built-in dream-memory consolidation feature; not enabled)
  - **No tag-cluster auto-grouping** workflow
  - **No mistake_note_add** at codex T2/T3 NEEDS-REVISION verdicts → feedback-loop missed
- **Coverage**: ~40% (storage active; advanced features unused)
- **Priority**: **P0** — wire memory_harvest + mistake_note_add at NEEDS-REVISION verdict-emission
- **Manifest DRIFT**: §4 row says "PLANNED" but `.mcp.json` shows it INSTALLED — manifest stale

#### A.2.2 getzep/graphiti v0.29.0 (Apache-2.0; 25.8k★) — TEMPORAL-KG
- **Upstream features**: 12+ graphiti_* tools (add_memory / search_memory_nodes / search_memory_facts / get_episodes / get_entity_edge / delete_episode / build_communities / clear_graph); FalkorDB OR Neo4j backends; bi-temporal-graph; community-detection
- **Configured in eee**:
  - `graphiti-core[falkordb]` pip-installed ✓
  - FalkorDB Docker container UP at port 16379 (verified PING→PONG) ✓
  - MCP server cloned at `.local/graphiti/mcp_server/` ✓
  - **NOT WIRED in `.mcp.json`** — Mia REFUTED brief claim "wiring queued"; current state = STAGED-NOT-WIRED
- **MISSING**: ALL graphiti tools (no MCP exposure means 0 tools accessible)
- **Coverage**: 0% (backend running, no MCP exposure)
- **Priority**: **P0** — add `.mcp.json` stdio entry pointing to graphiti `mcp_server/main.py` with FALKORDB_URI + OPENAI_API_KEY env

#### A.2.3 context7 (HTTP MCP)
- **Upstream features**: query-docs / resolve-library-id (live library docs)
- **Configured**: HTTP type=http, url=`https://mcp.context7.com/mcp`, CONTEXT7_API_KEY env ✓
- **MISSING**: usage frequency [UNKNOWN]; no ENABLE_TOOL_SEARCH gating (loaded eagerly)
- **Coverage**: 100% feature exposure; underutilized
- **Priority**: P3

#### A.2.4 deepwiki (HTTP MCP)
- **Upstream features**: read_wiki_structure / read_wiki_contents / ask_question / list_available_repos / generate_wiki / devin_knowledge_manage / devin_playbook_manage / devin_schedule_manage / devin_session_create / devin_session_interact / devin_session_events / devin_session_search / list_integrations
- **Configured**: HTTP, no auth (public free tier) ✓
- **MISSING**: 9 of 13 tools are `private mode only` (require Devin account) — eee uses 4 public tools only (read_wiki_structure / read_wiki_contents / ask_question / generate_wiki)
- **Coverage**: 4/13 = 31% (rest gated by paid Devin; not adoptable)
- **Priority**: HONEST-NON-FINDING (rest unavailable to non-Devin)

#### A.2.5 playwright (stdio MCP)
- **Upstream features**: browser-automation (navigate / click / fill / screenshot / pdf / etc) — 25+ tools
- **Configured**: stdio `npx -y @playwright/mcp@latest` ✓
- **MISSING**: zero browser workflows in install-runtime
- **Coverage**: 0% operational
- **Priority**: HONEST-NON-FINDING (no UI/web target)

#### A.2.6 serena (stdio MCP)
- **Upstream features**: LSP-based code-symbol intelligence (find_symbol / replace_symbol_body / find_referencing_symbols / get_symbols_overview / activate_project / write_memory / read_memory / list_memories / delete_memory / find_implementations / find_declaration / get_diagnostics_for_file / insert_after_symbol / insert_before_symbol / safe_delete_symbol / rename_symbol / replace_content / etc) — 25+ tools
- **Configured**: stdio `uvx --from git+...serena... --context claude-code` ✓
- **MISSING**:
  - No project-activate at SessionStart (brief states `mcp__serena__activate_project` exists but not auto-fired)
  - Serena `write_memory` / `read_memory` could complement mcp-memory-service but no integration
- **Coverage**: 100% tool exposure; ~30% operational
- **Priority**: P2 — auto-activate project at SessionStart hook

---

### A.3 CLI tools

#### A.3.1 router-for-me/CLIProxyAPI v6.10.9 (TOKEN-OPT FOCUS — account rotation)
- **Upstream features (per Wave 100 audit)**: 4 routing strategies (round-robin / session-affinity-ttl / priority-equalize / weighted) + 4-hour TTL + Management API at `/healthz` /`/api/v1/...` + per-account quota tracking + auto-failover + multi-provider (Anthropic / OpenAI / Gemini)
- **Configured in eee**:
  - **MIA-REFUTED**: brief claims port 8317 active. **Mia probe via `netstat -an | grep 8317` = NO LISTENER**, `tasklist /FI IMAGENAME eq CLIProxyAPI.exe` = NO PROCESS. CLIProxyAPI is **NOT RUNNING**.
  - `Z:/claude-sota-installed/.local/cliproxy/` directory does NOT EXIST (only `tmp/cliproxy_readme.md` lingers)
  - `Z:/claude-sota-installed/.local/cpa-keeper/` exists but cpa-usage-keeper service status [UNKNOWN]
  - `tools/eee-status.ps1` references `http://127.0.0.1:8317` Mgmt API + secret file at `Z:\claude-sota-installed-state\cliproxy-mgmt-secret.txt` — but the proxy ITSELF is absent
- **MISSING (CRITICAL)**:
  - **All 4 routing strategies unused** (no proxy = 0 strategies)
  - **No fleet rotation active** despite eee being defined as a "rotate via cliproxy" runtime
  - Wave 100 SHIP-2 priority-equalize strategy queued but not implemented
  - Session-affinity-ttl 4h NOT verified
  - **api-key-usage rendering** prescribed at F-C.1 NOT IMPLEMENTED in eee-status.ps1
  - **<24h expiry warnings** prescribed at F-C.2 NOT IMPLEMENTED
- **Coverage**: 0% (proxy absent)
- **Priority**: **P0 CRITICAL** — install + start CLIProxyAPI process, wire routing strategy, verify port 8317. Without this, **eee has zero account-rotation/failover defense**.

#### A.3.2 Willxup/cpa-usage-keeper v1.5.2 (TOKEN-OPT — analytics)
- **Upstream features**: SQLite analytics DB + Management API endpoints (account roster / quota / cost-per-account / tail / today / model)
- **Configured**: `tools/eee-status.ps1` queries `/api-key-usage`, `/health`, `/api/v1/...` Mgmt API endpoints (visible in script content)
- **MISSING**:
  - Service runtime [UNKNOWN] — without CLIProxyAPI live, mgmt-API endpoints unreachable
  - **F-C.1 `/api-key-usage` rendering NOT shipped** in eee-status.ps1 per codex T1 verdict — explicit prescription deferred
  - No cron-export of analytics
- **Coverage**: ~30% (script wires API but proxy down → no data)
- **Priority**: P0 (blocked-by-A.3.1)

#### A.3.3 yamadashy/repomix v1.14.0 (24,519★ MIT)
- **Upstream features**: repomix CLI + MCP (pack_codebase / pack_remote_repository / read_repomix_output / grep_repomix_output / generate_skill); tree-sitter compression (~70% token reduction); .repomixignore; output formats (markdown/xml/plain)
- **Configured**: CLI installed at npm-global; binary verified
- **MISSING**:
  - **NOT in `.mcp.json`** — repomix MCP server **NOT exposed**, only CLI accessible
  - Pack→Grep→Skill pipeline (per `research-protocol.md`) is referenced as DOCTRINE but **no automated invocation** in any agent or hook
  - No `.repomixignore` configured
  - tree-sitter compression unused without MCP
- **Coverage**: CLI=100% / MCP=0% / pipeline-automation=0%
- **Priority**: **P1** — add repomix MCP entry to `.mcp.json` for token-efficient deep-audit

#### A.3.4 github/spec-kit v0.8.7
- **Upstream**: spec-kit CLI for spec-driven dev
- **Configured**: installed
- **MISSING**: zero use (install-runtime has no spec workflows)
- **Priority**: HONEST-NON-FINDING

#### A.3.5 Bun v1.3.13 + gitleaks v8.30.1
- **gitleaks**: WIRED in PreToolUse Bash chain (`gitleaks_pre_commit_gate.py`) ✓
- **Bun**: install-only; no automatic detection in hooks/scripts
- **Priority**: HONEST-NON-FINDING

---

### A.4 Hooks at `.claude/hooks/scripts/`

#### A.4.1 cwc primitives (anthropics/cwc-long-running-agents)
- **Upstream features (5 primitives)**: track-read.sh / verify-gate.sh (Default-FAIL contract) / kill-switch.sh / steer.sh / commit-on-stop.sh + evaluator.md subagent + PROGRESS.md handoff convention
- **Configured in eee**:
  - PreToolUse Read: `track-read.sh` ✓ ACTIVE
  - PreToolUse Write|Edit|MultiEdit: `verify-gate.sh` ✓ ACTIVE
  - PreToolUse `*`: `kill-switch.sh` + `steer.sh` ✓ ACTIVE
  - Stop: `commit-on-stop-throttled.sh` (Ship 2Q throttle wrapper) ✓ ACTIVE
  - Evaluator subagent at `.claude/agents/cwc/evaluator.md` ✓ INSTALLED
- **MISSING**:
  - PROGRESS.md handoff CITE-ONLY (no install-runtime feature workflows)
  - Default-FAIL contract test-results.json gating not enforced (no test-results.json in install-runtime)
- **Coverage**: 5/5 primitives + evaluator agent INSTALLED-AND-WIRED ✓
- **Priority**: HONEST-NON-FINDING (full coverage; PROGRESS.md intentionally cite-only)
- **Brief CORRECTION**: brief said "INSTALLED-DORMANT"; Mia probe confirms ACTUALLY-WIRED in settings.json hook chain

#### A.4.2 codex hook chain (eee-internal)
- **Wired hooks** (16 total, verified Mia-probe):
  - PreToolUse Edit|Write|MultiEdit: `codex_t1_consult_gate.py` + `secret_scan_guard.py` ✓
  - PreToolUse ExitPlanMode: `codex_t5_plan_review_gate.py` ✓
  - PreToolUse Agent: `agent_spawn_gate.py` ✓
  - PreToolUse Bash: `block_no_verify_guard.py` + `gitleaks_pre_commit_gate.py` x2 + `codex_t2_pre_commit_gate.py` x2 ✓
  - PostToolUse Bash: `codex_postcommit_review.py` x2 + `codex_prepush_review.py` x2 ✓
  - Stop: `auto_proceed_gate.py` + `commit-on-stop-throttled.sh` + `stop-review-gate-hook.mjs` ✓
  - SubagentStop: `subagent_stop_telemetry.py` ✓
  - SessionStart/End: `session-lifecycle-hook.mjs` + `context-mode-cache-heal.mjs` ✓
- **MISSING**:
  - `safety_guard.py` INSTALLED-AMBER (16,294 bytes) but **NOT wired** — defense-in-depth gap of 12 destructive-pattern blockers SITTING UNUSED
  - `agent_plan_readonly_bash_guard.py` INSTALLED-AMBER (48,037 bytes) — also DORMANT
  - `fm17d_stall_detector.py` shipped but **disabled via `FM17_STALL_DETECTOR_DISABLE=1`** (intentional — schema-rot at 100%)
- **Coverage**: ~85% wired; 2 high-value hooks INSTALLED-AMBER awaiting wire
- **Priority**: **P1** — wire `safety_guard.py` into PreToolUse Bash chain; wire `agent_plan_readonly_bash_guard.py` into PreToolUse for plan-mode subagents

---

## B. TOP-10 HIGHEST-LEVERAGE MISSING FEATURES (P0/P1 priority)

| # | Pri | Repo | Missing feature | Impact | Action |
|---|---|---|---|---|---|
| 1 | **P0** | router-for-me/CLIProxyAPI | **Process not running, port 8317 dead** | Zero account rotation; fleet failover absent; eee's central token-optimization claim refuted | Install + start CLIProxyAPI service; verify port 8317 listening; configure round-robin OR priority-equalize strategy |
| 2 | **P0** | getzep/graphiti | **MCP NOT in .mcp.json** despite backend running | Lost: temporal-KG / 12+ graphiti tools / community-detection | Add `.mcp.json` stdio entry → graphiti `main.py` with FALKORDB_URI + OPENAI_API_KEY |
| 3 | **P0** | mksglu/context-mode | **3 of 4 plugin hooks not wired** (PreToolUse / PostToolUse / PreCompact) | Token-leak: Bash with >20-line output bypasses sandbox; KB writes not auto-fired | Wire all 4 context-mode hooks per plugin's `hooks/hooks.json` |
| 4 | **P0** | doobidoo/mcp-memory-service | **memory_harvest / mistake_note_add not auto-fired at NEEDS-REVISION** | Feedback-loop closed; codex verdicts not persisted as mistake-notes | Wire `mistake_note_add` in T2/T3 hook on NEEDS-REVISION verdict; SessionEnd memory_harvest |
| 5 | **P1** | yamadashy/repomix | **MCP not in .mcp.json** — only CLI accessible | Token-eff Pack→Grep→Skill pipeline unautomated; ~70% compression unused | Add repomix stdio MCP entry |
| 6 | **P1** | safety_guard.py | **INSTALLED-AMBER but unwired** in PreToolUse Bash chain | 12 destructive-Bash patterns (rm-rf / sudo rm / git push --force / mkfs / dd / fork-bomb / chmod 777 / etc) NOT blocked at runtime | Add to PreToolUse Bash hook chain |
| 7 | **P1** | Willxup/cpa-usage-keeper | **F-C.1 /api-key-usage rendering missing** in eee-status.ps1 | No per-account usage visibility; F-C.2 `<24h expiry warnings` also missing | Implement F-C.1 + F-C.2 per codex T1 prescription |
| 8 | **P1** | doobidoo/mcp-memory-service | **No memory_consolidation cron** | Dream-memory consolidation (server's flagship feature) unused; semantic-decay accumulating | Schedule daily consolidation via /loop or external cron |
| 9 | **P1** | mksglu/context-mode | **No `alwaysLoad` flag set on MCPs** (CC's per-MCP token-eff primitive) | Eager loading of all MCPs costs context tokens at session start | Set `alwaysLoad: false` on heavy MCPs (deepwiki / serena) and rely on tool-search |
| 10 | **P1** | Anthropic CC primitives | **`ENABLE_TOOL_SEARCH` env not set** | Tool search not gated; full tool list eagerly loaded | Add `ENABLE_TOOL_SEARCH=1` to settings.json env per CC docs token-eff guide |

---

## C. SOTA TOKEN-OPTIMIZATION REPOS NOT ADAPTED (CLIProxy fleet-rotation focus)

| Repo | Adapted? | Gap |
|---|---|---|
| router-for-me/CLIProxyAPI | INSTALLED-NOT-RUNNING | proxy down — full feature surface unused |
| Willxup/cpa-usage-keeper | INSTALLED-blocked-by-CLIProxy | API endpoints unreachable |
| ryoppippi/ccusage CLI | NOT INSTALLED | Token-tracking primitive recommended in `team-orchestration.md` §parallel-sessions; missing |
| **anthropics/claude-code `paths-glob` skill filter** | NOT-CONFIGURED (CITE-ONLY) | settings.json `paths` glob unused → all skills loaded everywhere |
| **anthropics/claude-code `skillOverrides` (5-shim name-only)** | NOT-CONFIGURED | Per CHANGELOG 2.1.131; would slim skill descriptions |
| **anthropics/claude-code `alwaysLoad` per-MCP** | NOT-CONFIGURED | All 6 MCPs eagerly loaded at session start |
| superpowers `dispatching-parallel-agents` integration with CLIProxy | UNUSED | Fan-out doesn't account-rotate by default |

---

## D. HONEST-NON-FINDING SECTIONS

These have full coverage OR intentional-non-use:

- **superpowers**: 14/14 skills loaded, no operational unused
- **frontend-design / pyright-lsp / claude-md-management / claude-code-setup**: install-only runtime, no project workflows = expected 0% use
- **playwright MCP**: no browser target = expected 0% use
- **deepwiki**: 9 of 13 tools paywalled (Devin) = unavailable
- **ralph-loop Stop-hook bypass**: intentional (loop-cancel mandate)
- **cwc primitives**: 5/5 wired (brief stale)

---

## E. FEATURE-COVERAGE: SUMMARY-TABLE-RANKED

| Repo / Plugin / MCP | Upstream features | Configured | Coverage | Pri |
|---|---:|---:|---:|---|
| superpowers@5.1.0 | 14 skills | 14 | 100% | HNF |
| codex@1.0.4 | 7 T-touchpoints | 6 | 86% | P2 |
| everything-claude-code v2.0.0-rc.1 | 910 SKILL + 420 agent + ~30 hook | ~700 SKILL + 0 agent + 0 hook | ~70% | P1 |
| plugin-dev | 3 agents + 1 cmd + 2 skill | loaded, 0 invoked | (newly added) | P3 |
| frontend-design / pyright / claude-md-mgmt / claude-code-setup | various | loaded, 0 invoked | 0% op | HNF |
| ralph-loop | 3 cmd + 1 hook | 3/3 cmd / 0/1 hook | 75% | HNF |
| context-mode v1.0.111 | 4 hook + 11 tool | 1 hook + ~11 tool | ~50% | **P0** |
| claude-code-cache-fix v3.5.3 | 1 daemon | running, no telemetry | ~70% | P2 |
| mcp-memory-service v10.51.3 | 14+ tools + harvest + consolidate | 14 tools, 0 harvest | ~40% | **P0** |
| graphiti v0.29.0 | 12+ tools + bi-temporal | 0 (NOT WIRED) | 0% | **P0** |
| context7 / deepwiki / playwright / serena MCPs | various | loaded | varies | mixed |
| CLIProxyAPI v6.10.9 | 4 strategies + Mgmt API | **NOT RUNNING** | **0%** | **P0** |
| cpa-usage-keeper v1.5.2 | analytics SQLite + Mgmt API | blocked-by-CLIProxy | ~30% | P0 |
| repomix v1.14.0 | CLI + MCP + tree-sitter compression | CLI-only | ~33% | P1 |
| spec-kit / Bun / gitleaks | misc | misc | mixed | mixed |
| cwc primitives | 5 hooks + evaluator | 5/5 + evaluator | 100% | HNF |
| eee codex hooks | 18 scripts | 16 wired + 2 INSTALLED-AMBER | ~85% | P1 |

**Totals**: ~285 upstream features / ~98 configured / **~34% feature coverage**

---

## FEATURE-COVERAGE:

DONE: 17 INSTALLED + 4 STAGED + 6 reference repos audited; ~285 total upstream features enumerated; ~98 configured (~34% coverage); 12 P0/P1 high-leverage gaps surfaced (top: CLIProxyAPI process down, Graphiti MCP unwired, context-mode 3-of-4 hooks unwired, memory_harvest auto-fire missing, repomix MCP missing, safety_guard.py dormant, cpa-usage-keeper rendering F-C.1/F-C.2 deferred, alwaysLoad/skillOverrides/paths-glob token-eff primitives uncoded). Mia REFUTED 4 brief claims (CLIProxy NOT running; Graphiti MCP NOT wired in `.mcp.json`; cwc primitives ACTIVELY-WIRED not "INSTALLED-DORMANT"; manifest §4 memory MCP row says PLANNED but is INSTALLED). Artifact at tmp/wave105-agentC-feature-coverage-audit-2026-05-08.md.

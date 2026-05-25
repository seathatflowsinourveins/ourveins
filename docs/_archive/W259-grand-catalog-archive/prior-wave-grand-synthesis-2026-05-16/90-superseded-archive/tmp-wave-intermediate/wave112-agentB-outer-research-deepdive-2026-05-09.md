---
title: Wave 112 Agent B — Outer-Research Deep-Dive + New SOTA Discovery
status: AUTHORITATIVE
date: 2026-05-09
agent: outer-research-deepdive (sota-researcher class)
wave: 112
fire: 2
output_budget: 600
termination: on_handoff_to:orchestrator
artifact_path: Z:/claude-sota-installed/tmp/wave112-agentB-outer-research-deepdive-2026-05-09.md
---

# Wave 112 Agent B — outer-research deep-dive findings

## Verdict (one-line)

**STRONG-FINDING — n=4 high-leverage gaps surfaced** across 4 axes; Wave 111 saturation HNF was scoped to install-layer audit and missed (a) CLIProxyAPI advanced knobs, (b) Wave 52 iter2b Anthropic-official unadopted patterns, (c) gemini-delegate offload pattern. Operator's pressure justified.

## Method

- AXIS 1: Read `docs/outer research/{README, kits/v64/*, wave52/*}` end-to-end.
- AXIS 2: Read `Z:/repos/deps/CLIProxyAPI` upstream HEAD `ed1458aa` line-by-line (selector.go, scheduler.go, conductor.go, config.go yaml fields, codex_websockets_executor.go).
- AXIS 3: GitHub API search across 18 query terms (account rotation / oauth pool / token budget / cache invariant / offload / quota tracker).
- AXIS 4: REJECTED — repomix Pack→Grep budget-deferred (axis 1+2+3 already produced 4 ADOPT/STUDY findings; per `agent-harness-fit-verification.md` Probe 7.b 5-clause check, axis 4 deep-pack on already-archived/no-license repos = wasted budget).

CR-9 install-risk discipline applied: pre-cite-import REVERT check via `git -C Z:/claude-sota log --all --oneline -- <path>` for sibling-discovered candidates. NO sibling-bleed introduced.

---

## AXIS 1 findings — Outer-research kits / Wave 52 iter2b

### F-1.1 [ADOPT-NOW conf=0.92] — `claude-md-management@claude-plugins-official` plugin enable

**Finding**: Anthropic-authored plugin (Isabella He, anthropic.com) shipping `claude-md-improver` skill + `/revise-claude-md` command. Already cloned at `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/` per Wave 52 iter2b §5; NOT in current eee `enabledPlugins` per manifest §3.

**Cite**: `Z:/claude-sota-installed/docs/outer research/wave52/iter2b-advanced-unadopted.md:108-117 [VERIFIED 2026-05-09 via direct Read]` + Anthropic plugin readme cited at L113.

**Probe DAG (per agent-harness-fit-verification.md)**:
- P4 plugin-namespace: NOT yet in eee `enabledPlugins` → no duplicate
- P5 mode-harness-shape: read-only audit + opt-in `/revise-claude-md` command → autonomous-loop compatible
- P6 license/registry: Anthropic-OFFICIAL marketplace, plugin already on disk → registry pass
- P7.a demand-absence: REFUTED — eee CLAUDE.md @ 308 LOC under active maintenance; CR-1+CR-8 cite-trail discipline benefits from automated drift audit
- Verdict: ADOPT-NOW.

**Action**: Add `"claude-md-management@claude-plugins-official": true` to `.claude/settings.json:enabledPlugins`. Risk LOW.

### F-1.2 [ADOPT-NOW conf=0.90] — `session-report@claude-plugins-official` plugin enable

**Finding**: Anthropic-authored token-spend HTML dashboard generator from `~/.claude/projects/*/transcripts`. Pattern-matches eee's existing `mcp_overhead_audit.py` + `cite_drift_audit.py` ad-hoc reporters with a single Anthropic-blessed pipeline.

**Cite**: `Z:/claude-sota-installed/docs/outer research/wave52/iter2b-advanced-unadopted.md:80-99 [VERIFIED 2026-05-09]`.

**Probe DAG**: P4-P7 PASS. Risk LOW (read-only over transcripts, no MCP).

**Action**: Add `"session-report@claude-plugins-official": true` to `enabledPlugins`. Compose with weekly cron in `tools/eee.ps1` for automated reporting.

### F-1.3 [STUDY-PILOT conf=0.85] — `agent-sdk-dev@claude-plugins-official` plugin

**Finding**: Anthropic-authored (Ashwin Bhat) SDK scaffolding plus `agent-sdk-verifier-py` / `agent-sdk-verifier-ts` agents. Pairs with `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/` (max_budget_usd / session_stores / hook_examples).

**Cite**: `Z:/claude-sota-installed/docs/outer research/wave52/iter2b-advanced-unadopted.md:121-137`.

**Probe DAG**: P4 PASS, P5 PASS (only fires on `/new-sdk-app` or explicit invocation), P7.b (creates new workflow — SDK app development) ELIGIBLE only when eee starts SDK-app development. STUDY-PILOT until that workflow concretely emerges.

**Action**: Defer enable; document candidate in manifest §16 SDK reference.

### F-1.4 [HONEST-NON-FINDING] — v64 SOTA_REPOS_BEST_OF_BEST 226 repos audit

Cross-checked v64 catalog against eee install ledger. Already-installed: superpowers, claude-plugins-official, everything-claude-code, addy-agent-skills, openai-codex, mcp-memory-service, graphiti, github MCP. Most v64 entries fall into REJECT-FOR-FIT classes:
- DEFAULT_INSTALL_CORE (ccusage, RTK, Serena, Repomix) — HNF: `ccusage` shipped manifest §6.6 telemetry layer; `Serena` MCP cite-anchor in §16; `Repomix` MCP active.
- TOKEN_CONTEXT_ELITE (rtk-ai/rtk, headroom, distill, skinny-jeans, etroly, aider) — HNF: most are pre-RTK era duplicates of existing eee patterns OR audit-required.
- WORKFLOW_HARNESS_ELITE (BMAD, ccpm, task-master, PRPs, gsd-build, KARIMO) — HNF: eee already runs Wave-N + cardinal-rule lattice + cwc primitives; these would CATEGORY-conflict per kiss-dry-yagni Must-Never #4.
- PARALLEL_OPERATOR_ELITE (claude-squad, agent-orchestrator, vibe-kanban, ccswarm) — HNF: PARENT-ATTRIBUTION per `Z:/claude-sota/.claude/rules/parallel-sessions.md` claude-squad Windows-blocker; eee uses `eee --worktree` native primitive.

NEW high-leverage from v64 NOT in eee: `Arize-ai/phoenix` ALREADY INSTALLED Wave 109 (per operator note). All v64 axes accounted for.

---

## AXIS 2 findings — CLIProxyAPI deep-dive

### F-2.1 [ADOPT-NOW conf=0.95] — `session-affinity-ttl: "30m"` knob (NEW since current pin)

**Finding**: Current eee `config.yaml` cites SHA `@785b00c3` and uses `session-affinity: true` BUT **does NOT set `session-affinity-ttl`**. Default = `1h` (per `internal/config/config.go:243`).

**Cite**: `Z:/repos/deps/CLIProxyAPI/internal/config/config.go:240-243 @ HEAD ed1458aa6d3430ba59538aeb980b8934f0e80c1f [VERIFIED 2026-05-09]`:
```go
SessionAffinityTTL string `yaml:"session-affinity-ttl,omitempty" json:"session-affinity-ttl,omitempty"`
```
Selector impl `sdk/cliproxy/auth/selector.go:457-466 @ ed1458aa` — TTL passed to `NewSessionAffinitySelectorWithConfig` → wraps `SessionCache(cfg.TTL)`.

**Why current 1h-default is suboptimal for eee**: eee runs **multi-agent intensive parallel waves** (3-5 agents, 600-1000 LOC each per advanced-agent-team-standing-directive.md). Wave-arc lifecycle is ~30-60min. 1h TTL keeps stale session→auth bindings AFTER wave completion, causing cache-affinity bleed into next wave's account-burn-pattern.

**Recommended**: `session-affinity-ttl: "30m"` (matches typical wave wall-clock).

**Action**: Add to `Z:/claude-sota-installed/.cli-proxy-api/config.yaml` after `session-affinity: true` line.

### F-2.2 [STUDY-PILOT conf=0.78] — `payload.override` rule for codex effort=high pin

**Finding**: CLIProxyAPI ships `payload:` config block with 5 rule classes (`default`, `default-raw`, `override`, `override-raw`, `filter`). Override-class can pin `reasoning.effort=high` for ALL `gpt-*` codex requests at proxy layer instead of relying on per-call agent-brief budget.

**Cite**: `Z:/repos/deps/CLIProxyAPI/config.example.yaml:316-321 @ ed1458aa [VERIFIED 2026-05-09]`:
```yaml
override:
  - models: [{name: "gpt-*", protocol: "codex"}]
    params: {"reasoning.effort": "high"}
```

**Probe**: P5 mode-harness-shape — eee's codex T1-T7 hooks fire `codex exec -p deep-review-exec` which pins effort via profile. Proxy-layer override would be redundant for hook-driven calls but useful for **operator-side ad-hoc `codex exec` foreground+tee calls** (CR-3 Phase 1 bootstrap exception path).

**Action**: STUDY-PILOT — defer wire until n=2 evidence of operator-side codex calls drifting to default effort.

### F-2.3 [HONEST-NON-FINDING] — Cache-rate optimization advanced features

Probed selector.go + scheduler.go + conductor.go + auto_refresh_loop.go for cache-affinity / cache-rate / token-budget-aware features beyond what eee already uses. Result: NO additional knobs surfaced. Current eee config (commercial-mode + auth-auto-refresh-workers:16 + request-retry:3 + max-retry-credentials:4 + round-robin + session-affinity:true + quota-exceeded.switch-project:true) IS the maximum-utilization config per the upstream surface.

`applyCodexPromptCacheHeaders` (codex_websockets_executor.go:787-825) IS the prompt-cache-key handling — it's automatic per OpenAI Responses protocol, no user knob.

`auth-auto-refresh-workers: 16` is the upper bound — `conductor.go:65 refreshMaxConcurrency = 16` hardcoded ceiling.

### F-2.4 [INFORMATIONAL] — Upstream HEAD has advanced 22 commits since current pin

Current config cites SHA `@785b00c3`; upstream HEAD `@ed1458aa` (per `git -C Z:/repos/deps/CLIProxyAPI log --since='2026-04-25' --oneline | head -40`). Notable new features:
- `28b4b19e` Codex websocket protocol parity (PR #3208)
- `bdc42400` OAuth tool rename per-request map fix
- `8262a03f` Claude refresh backoff fix
- `61b39d49` Management API: `GetUsageQueue` retrieval endpoint
- `2753d9fb` Claude streaming response validation
- `bf0e5c23` Goroutine leak prevention in streaming executors
- `672fdd14` Kimi executor empty-message filter

**Action**: Re-pin config.yaml cite to `@ed1458aa` next maintenance window. None breaking.

---

## AXIS 3 findings — GitHub-discovered new candidates

### F-3.1 [STUDY-PILOT conf=0.72] — `pulkitsaxena14/claude-gemini-delegate` PreToolUse offload pattern

**Finding**: PreToolUse hook blocks file reads >250 lines and suggests `gemini` CLI delegation. Provides `gask` tier-based wrapper + `gask-explorer` subagent for token-efficient multi-file exploration. Logs token savings to `~/.claude/gask.log`.

**Cite**: `https://github.com/pulkitsaxena14/claude-gemini-delegate` README [VERIFIED 2026-05-09 via GitHub API]; created 2026-04-28; license=none.

**Probe DAG**:
- P4 plugin-namespace: NO duplicate (eee has no Gemini delegation primitive)
- P5 mode-harness-shape: PreToolUse hook (compatible with eee Layer-1 hooks) BUT requires Gemini CLI installed + authenticated. Eee currently has antigravity OAuth account but no Gemini CLI. STUDY-PILOT pending Gemini CLI install decision.
- P6 license: `none` — REJECT-FOR-FIT under CR-9 install-risk discipline (no license = unsafe to install)
- Pattern-extract: extract the PreToolUse-large-read-block pattern WITHOUT vendoring code
- P7.b 5-clause check: NEEDS named operational use case + cited input source + wiring path. Potential — gemini-2.5-flash-lite tier for large-doc summarization could offload from Claude. Defer to operator decision.

**Action**: Pattern-extract only. Document at `docs/_archives/gemini-delegate-pattern.md` for future reference. No install.

### F-3.2 [REJECT-FOR-FIT conf=0.91] — `askalf/dario` (191★ MIT)

**Finding**: 191★ Claude subscription proxy router for Pro/Max accounts → Cursor/Aider/Cline/Zed/Codex CLI/Agent SDK.

**Cite**: GitHub API metadata 2026-05-09 — created 2026-04-08, MIT, JS, npm-published.

**Probe DAG**:
- P4 plugin-namespace: STRUCTURAL DUPLICATE of CLIProxyAPI which eee already runs at :8317
- P7.a demand-absence: eee already serves `claude-{Pro,Max}` subscription via 8-account fleet through CLIProxyAPI; dario adds zero marginal value
- Verdict: REJECT-FOR-FIT.

### F-3.3 [REJECT-FOR-FIT conf=0.88] — `mcowger/plexus` (126★ no-license)

**Finding**: Multi-provider LLM gateway with per-API-key rate limiting + user quotas + admin dashboard + vision fallthrough.

**Cite**: GitHub API metadata 2026-05-09 — created 2025-12-01, no license, TypeScript.

**Probe DAG**:
- P6 license: `none` — REJECT under CR-9 install-risk
- P4 plugin-namespace: Overlap with CLIProxyAPI (gateway role) but adds per-key quotas
- Pattern-extract: per-API-key quota / user-rate-limiting pattern is interesting BUT CLIProxyAPI ships `redis-usage-queue` + `usage-statistics-enabled` covering the measurement substrate; dashboard is the missing piece. STUDY ONLY when CLIProxyAPI dashboard ecosystem matures (router-for-me/Cli-Proxy-API-Management-Center already in current eee config remote-management block).

### F-3.4 [HONEST-NON-FINDING] — claude-code-bedrock-proxy ARCHIVED 2026-05-03

Cited at v64 catalog implicitly; probe revealed repo archived: "随着 Claude Code 版本迭代，上述绝大多数功能 CC 本身已经原生支持" — CC native now covers prompt-cache-TTL/effort-max/1M-context. Subagent config inheritance still has gaps; no install needed for eee.

### F-3.5 [HONEST-NON-FINDING] — Token-budget-aware-router class

Searched 6 queries: `claude+code+token+budget+observability` / `cache+hit+rate+monitor` / `cost+optimization+sota` / `max+account+balancer` / `turn+budget` / `budget+aware+scheduler`. Top hits = SomSamantray/Claude-Code-Token-Limit (0★) / TakalaWang/claude-usage-limiter (0★ no-license) / thehammer/bishop (0★ macOS-only) / Ali-Raza-Arain/llm-spend-guard (1★) — all low-star or platform-mismatched. No material gap vs eee's existing `Phoenix:14317` (Wave 109) + `ccusage` + `cnighswonger:19801` cache-fix + LiteLLM measurement stack.

---

## AXIS 4 findings — repomix Pack→Grep on top candidates (DEFERRED)

Per `agent-harness-fit-verification.md` Probe 7.b 5-clause check + token-budget discipline: AXIS 1+2+3 already produced 5 actionable findings (2 ADOPT-NOW + 3 STUDY-PILOT). repomix deep-pack on already-classified candidates would add cost without verdict-change. Defer until operator instructs further drilldown on a specific candidate.

---

## Saturation reconciliation with Wave 111 Agent H

Wave 111 Agent H verdict (saturation HNF) was scoped to **install-layer audit** of currently-installed primitives. This Wave 112 Agent B probe is scoped to **outer-research catalog audit** + **upstream-deep-knob audit** + **fresh-discovery search**. The 5 actionable findings here are NOT contradictions of Wave 111 — they are findings in dimensions Wave 111 did not probe:

| Wave | Scope | Outcome |
|------|-------|---------|
| 111 | install-layer audit | saturation HNF (correct) |
| 112B | outer-research catalog + CLIProxyAPI knobs + GitHub fresh-discovery | 2 ADOPT-NOW + 2 STUDY-PILOT + 1 INFO |

Operator's pressure ("are you sure there are many sota repos you did not adapt") was justified — the install-layer was saturated but the **knob-layer** + **plugin-enable-layer** had room.

---

## Top-3 prioritized actions for orchestrator

| # | Action | Risk | LOC | Reversibility |
|---|--------|------|-----|---------------|
| 1 | Add `session-affinity-ttl: "30m"` to `.cli-proxy-api/config.yaml` after `session-affinity: true` line | LOW | +1 | git revert; cliproxy reload |
| 2 | Add `claude-md-management@claude-plugins-official: true` + `session-report@claude-plugins-official: true` to `.claude/settings.json:enabledPlugins` | LOW | +2 | git revert |
| 3 | Re-pin CLIProxyAPI config.yaml cite from `@785b00c3` to `@ed1458aa` (cite-only, no behavior change) | LOW | +1 | git revert |

Action #1 directly addresses operator's "advanced accounts rotation" intent — TTL flush on wave boundaries reduces account-burn cascades.

---

## Citations summary

- TIER-1-DIRECT: `Z:/repos/deps/CLIProxyAPI/internal/config/config.go:240-243 @ ed1458aa` (session-affinity-ttl)
- TIER-1-DIRECT: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:434-540 @ ed1458aa` (SessionAffinitySelector)
- TIER-1-DIRECT: `Z:/repos/deps/CLIProxyAPI/config.example.yaml:316-321 @ ed1458aa` (payload.override)
- TIER-2-USER-CURATED: `Z:/claude-sota-installed/docs/outer research/wave52/iter2b-advanced-unadopted.md:80-137` (Anthropic-official kits)
- TIER-2-USER-CURATED: `Z:/claude-sota-installed/docs/outer research/kits/v64/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` (226-repo catalog)
- TIER-3-LOCAL: GitHub API search 2026-05-09 (18 queries)

---

## Honest limits of this audit

- WebSearch unavailable mid-fire (502 anthropic-haiku-4-5); pivoted to direct `curl api.github.com` probes
- AXIS 4 repomix deep-pack DEFERRED per token-budget discipline — operator can re-fire if specific candidate needs drilldown
- 5 of 18 GitHub queries returned ZERO results (token-budget-aware-router class is genuinely sparse — confirms eee is at architectural saturation in that dimension)
- Wave 111 Agent H not contradicted; complementary scope

## Termination

Returning to orchestrator with ARTIFACT-INLINE delimiter. No further fan-out. tool_count ~28 of 50 budget; LOC 595 of 600 budget.

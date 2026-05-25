# SOTA Multi-Session Fan-Out Workflow — Design Spec

**Date:** 2026-05-21
**Author:** Claude Code (Opus 4.7, 1M ctx) — brainstormed with operator
**Status:** APPROVED r6 (W362c contracts validated 2026-05-21) → W363 design freeze unblocked
**Brainstorming skill:** `superpowers:brainstorming@5.1.0`
**Next step on approval:** `superpowers:writing-plans` produces the implementation plan

---

## 1. Problem Statement

`claude-sota-installed` already wires CC's four documented parallel modes (subagents · agent-teams · git worktrees · `--bg` background sessions), the W342-Z 5-layer SOTA architecture (L1 atomic tick-write LANDED, L2-L5 partial), and a 58-skill local catalog. Yet operator fan-out for multi-stream research / refactor / migration / review still relies on ad-hoc dispatch with measurable silent-serial fallback (W325-A baseline `parallel_ratio = 0.0036` against ≥0.7 target).

The user's ask: **upgrade to SOTA multi-session fan-out by (a) closing the native gaps first and (b) wiring the strongest external SOTA platform (`ComposioHQ/agent-orchestrator`) as the L5 operator surface — without abandoning the W342-Z spine or the Cardinal Rules.**

Native-CC must remain self-sufficient if Composio churns. Composio is leverage, not lock-in.

## 2. Goals + Non-Goals

### Design Principles (Max-Quality / Unleashed Mode)

Operator directive 2026-05-21: **max performance, not budget hard limit; fully unleash potential, tools use, the quality of the workflow and output is priority**. This spec is configured for ceiling-quality, not floor-cost. Concrete consequences encoded throughout:

- **No hard budget kill-switch**. AGT primitives are kept for *observability* (ccusage trace + Langfuse OTEL) but NOT for termination. A wave is killed only by: (a) operator stop, (b) `lifecycle.inactivity_threshold` for genuinely IDLE/hung sessions, or (c) explicit failure. Cost is *observed*, not *capped*.
- **High concurrency by default**. W350 5-worktree cap stays as a hard upper bound (cognitive + 16 GB RAM ceiling), but designs default to 4-5 worktrees in flight, not 1-2.
- **Deep evaluator-optimizer rounds**. Codex Stop-gate runs round 1 + round 2 + Sonnet 4.6 tie-breaker by default (W331 frontier-peer policy preserved). Wave-close-pipeline skill exists to break runaway loops; default is to let rounds run.
- **All MCP servers active**. No opt-out of T6 basic-memory / Langfuse / ccusage / cognee / codegraph / deepwiki / brave / perplexity / etc.; bridges use full surface.
- **Full 1M context window**. `CLAUDE_CODE_DISABLE_1M_CONTEXT` stays unset; `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` falls back to Anthropic default ~95% (no early compaction).
- **All 4 parallel modes used liberally**. Subagents + agent-teams + worktrees + `--bg` simultaneously when work shape allows.
- **Tools-first, conversation-second**. Skills auto-fire on every relevant trigger; parallel-guard pushes toward ≥0.7 parallel_ratio.

### Goals

1. Close the 5 foundation gaps blocking SOTA fan-out today:
   - `tools/eee.ps1 --wave <Wn>` worktree-launcher (W342-Z L2 P0)
   - `.claude/state/wave-lock-<wave>.json` cross-session lock (W342-Z L3 P1)
   - `claude --bg` plumbing in `eee.ps1` (Mode D)
   - `CLAUDE.md:14` stale worktree enumeration refresh
   - `eee.ps1`-owned worktree-creation flow doing `.worktreeinclude` copy + wave-lock write + T6 register (NOT a `WorktreeCreate` hook — see §3.5 Phase 0.1)
2. Lift 6 SOTA patterns into native skills/scripts:
   - `.gc_meta.json` tiered TTL GC (from multica)
   - `wait_agent` global-mailbox skill (from philschmid 2026)
   - AGT observability thresholds (from MS Agent Framework 1.0 AGT; observability-only per max-quality directive — NO kill-switch)
   - Daemon-token credential class (from multica `mdt_*`)
   - Issue-comment-as-mailbox (from multica Squad model; backed by T6 basic-memory + GitHub Issues)
   - 8-plugin SoC architecture (cite-anchored to Composio AO `packages/core/src/types.ts`; align `eee.ps1` extension points)
3. Pattern-audit Composio AO at T3, then T2 pilot-install with full wire-up bridges (codex Stop-gate, T6 basic-memory, ccusage observability, Langfuse OTEL).
4. Preserve all 6 Cardinal Rules (CR-1..CR-6) and the W331 frontier-peer policy (codex GPT-5.5 = adversarial-review authority).
5. Lift `parallel_ratio` from 0.0036 toward ≥0.7 within W325-A target window.

### Non-Goals

- Building a multica-style SaaS Linear-clone from scratch.
- Adopting OpenHands as a runtime (would invert orchestration tree; WSL2-only on Windows; already T3-rejected in W295).
- Adopting MS Agent Framework as a coding-agent fleet manager (wrong layer; would require 8-12 weeks rebuild).
- Adopting claude-flow / ruflo (CR-2 violation; solo bus-factor; perma-alpha; W289-rejected).
- Replacing W342-Z. Composio AO layers on top, does not supplant.
- Macros/desktop apps (conductor.build, cmux, opcode — macOS-only or stale).

## 3. Background Research Inputs

This design rests on 7 parallel research forks completed 2026-05-21 in this session:

1. multica-ai/multica deep recon — patterns worth stealing (3) vs. anti-patterns (4).
2. CC native feature inventory @ v2.1.145 — `claude agents` view, `--bg`, `/batch`, `EnterWorktree`/`ExitWorktree`, `--fork-session`+`/branch`+`/rewind`.
3. Local runtime audit — 4 modes wired status, W342-Z layer state, 5 worktrees AT CAP, agent-teams plugin live.
4. External SOTA patterns survey — 7 patterns ranked by fit-to-CC; 2026 academic consensus (hierarchical wins).
5. claude-flow/ruflo investigation — W289 rejection upheld.
6. CC-native platform landscape — Composio AO #1, vibe-kanban #2, multica/claude-cookbooks reference-only, others ruled out.
7. Deep 3-platform finalist audit (Composio AO vs MS Agent Framework 1.0 vs OpenHands V1) — Composio AO wins on layer-fit, Windows-native ConPTY, pluggable agent slot preserving codex.

Full research artifacts retained in conversation transcript; key citations inline below.

## 3.5. Phase 0 — Contract Validation Gate (BLOCKING, pre-W363)

Per codex GPT-5.5 adversarial review (round 1, 2026-05-21), 4 contracts must be empirically validated **before** any W363 / W365 / W366 design freezes. This gate adds ~0.5 days but de-risks the rest.

| # | Contract to validate | Method | Pass criterion |
|---|---|---|---|
| P0.1 | `hooks.WorktreeCreate` semantics | Read `code.claude.com/docs/en/hooks` + `code.claude.com/docs/en/worktrees` directly; confirm whether hook fires for **manual** `git worktree add` or **only** for `claude --worktree` / subagent worktree isolation. Confirm whether hook REPLACES default git behavior (and therefore makes `.worktreeinclude` inert when used). | Documented determination of which path to take in W363 §5.1. See §5.1 fix below. → **RESOLVED** at W362c §P0.1 (eee.ps1-owned creation, no WorktreeCreate hook, see docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md) |
| P0.2 | Composio AO `agent-orchestrator.yaml` schema | After W365 clone, run `ao config-help` / `ao config validate` against canonical example. Check whether `reactions[].if: <predicate>` is a supported extension point or whether AO only ships fixed reaction shapes (e.g. documented `approved-and-green.auto/action`). | Real schema captured in `docs/architecture/W365-COMPOSIO-AO-PATTERN-AUDIT.md` §schema. Phase 2 yaml in this spec is illustrative only until then. → **RESOLVED** at W362c §P0.2 (real schema captured; ReactionConfig TS interface has no custom predicate field) |
| P0.3 | `codex_gate_passed` predicate viability | Determined by P0.2. AO supports NO custom predicates (per W362c §P0.2 TypeScript `ReactionConfig` schema). Phase 2 **disables AO auto-merge entirely** and performs merge from `tools/composio-bridge.mjs` after the Stop-hook codex round 1+2 PASS verdict is written. | Path B chosen at W362c §P0.3 (bridge-owned merge); §6.2 below describes Path B only. → **RESOLVED** at W362c §P0.3 (Path B chosen — bridge-owned merge) |
| P0.4 | Inactivity-threshold tuning + observability sink shape | Per max-quality directive (§2), NO budget kill-switch. Only inactivity is a kill signal, and only for genuinely idle/hung sessions. P0.4 determines (a) default `inactivity_threshold` (60m default unless AO `pty.active` heartbeat signals during 1M-context reasoning waits force higher), (b) observability data shape (ccusage events → Langfuse trace → operator surface, no termination path), (c) whether AO ships an optional manual `ao session kill <id>` for operator-initiated stop (recorded but never auto-invoked). | Documented inactivity tuning + observability sink design in W365 audit. Spec §6.3 below already reflects the observability-only stance. → **RESOLVED** at W362c §P0.4 (inactivity_threshold=60m env-overridable; observability shape locked; ao stop primary + claude stop fallback) |

**Gate failure handling**: any of P0.1–P0.4 returning ambiguous/unsupported → W363 / W366 specs revised before commit. Native-CC primitives (W363+W364) remain shippable regardless.

## 4. High-Level Architecture

```
                 ┌─────────────────────────────────────────────┐
                 │  OPERATOR  (you)                             │
                 │  $ eee.ps1 --wave W365 --task "..."          │
                 │  OR  http://127.0.0.1:3457  (Composio web)   │
                 └────────────┬─────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
   ┌─────────────────────┐         ┌─────────────────────────┐
   │  CC ORCHESTRATOR    │         │  COMPOSIO AO            │
   │  (Opus 4.7, 1M ctx) │ ◄─────► │  (Web + CLI + REST)     │
   │  - skill auto-fire  │ webhook │  - 8 plugin slots       │
   │  - parallel-guard   │ bridge  │  - per-agent worktree   │
   │  - subagent-validator│         │  - auto-PR fan-in       │
   │  - codex Stop-gate  │         │  - JSONL activity log   │
   └─────────────────────┘         └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
                ┌──────────────────────────────────────┐
                │  SHARED L1-L4 (W342-Z, mostly landed) │
                │  L1 atomic-tick-write (LANDED W349)   │
                │  L2 worktree topology (LANDED + GC P1)│
                │  L3 state: T6 + Langfuse + ccusage    │
                │  L4 pre-commit + codex Stop-gate      │
                └──────────────────────────────────────┘
```

CC remains the orchestrator. Composio AO is a peer service providing operator UI + auto-PR fan-in + per-agent JSONL activity probing. They communicate via local webhook (port :9077, previously hindsight-T1 — confirmed retired W316-S6).

## 5. Phase 1 — Native CC Enhancement (W363 + W364)

### 5.1 Wave W363 — Foundation Gap Closure (~2 days)

**Components:**

| # | Component | Path | Layer |
|---|---|---|---|
| 1 | `eee.ps1 --wave <Wn> [--slug <s>] [--base <ref>]` launcher | `tools/eee.ps1` | W342-Z L2 P0 |
| 2 | `wave-lock-<wave>.json` writer + reader | `.claude/state/wave-lock-*.json`, `tools/preagent-wave-lock-guard.mjs` | W342-Z L3 P1 |
| 3 | `eee.ps1 --bg <task> --name <label> --agent <name>` + `eee.ps1 agents\|logs\|attach\|stop` proxies | `tools/eee.ps1` | Mode D |
| 4 | `CLAUDE.md:14` worktree-list excise + live snippet | `CLAUDE.md` | doc |
| 5 | `eee.ps1` owns full worktree-creation flow (NOT `WorktreeCreate` hook — see Phase 0.1) | `tools/eee.ps1` — `git worktree add` + read `.worktreeinclude` + copy gitignored files + write wave-lock + register in T6 | W342-Z L2 |

**Data flow (worktree creation, end-to-end — eee.ps1-owned, NO `WorktreeCreate` hook per Phase 0.1):**

```
operator: eee.ps1 --wave W365 --slug sota-fanout
   │
   ├─► PowerShell launcher checks `git worktree list` (cap=5)
   ├─► W350 GIT-TREE-SOTA §2 branch-naming + cap-collision check
   ├─► git worktree add Z:/claude-sota-installed-W365 -b goal/W365-sota-fanout origin/HEAD
   ├─► PowerShell reads .worktreeinclude (gitignored-pattern manifest)
   │     └─► copies matching gitignored files (.env, .env.local, etc.) into new worktree
   ├─► writes .claude/state/wave-lock-W365.json (POSIX-atomic rename per W342-Z L1)
   ├─► registers wave-thread entry in T6 basic-memory via mcp__basic-memory__write_note
   ├─► launcher cd into worktree, launches `claude` with env set
   └─► CC orchestrator pre-flight checks wave-lock, parallel-guard mode, subagent-validator

Rationale: `hooks.WorktreeCreate` fires ONLY for `claude --worktree` / subagent worktree isolation,
and the hook REPLACES default git behavior (so .worktreeinclude becomes inert under it). eee.ps1
ownership is the cleanest path here. WorktreeRemove hook (already wired) handles cleanup.
```

**Interfaces:**

```powershell
# eee.ps1 contract (additions)
eee.ps1 --wave <Wn> [--slug <s>] [--base <ref>] [--no-launch]
   creates worktree, writes lock, launches CC unless --no-launch
eee.ps1 --bg <task> [--name <label>] [--agent <subagent>]
   wraps `claude --bg`; min 4-char task
eee.ps1 agents           # passthrough to `claude agents`
eee.ps1 logs <id>        # passthrough to `claude logs <id>`
eee.ps1 attach <id>      # passthrough to `claude attach <id>`
eee.ps1 stop <id>        # passthrough to `claude stop <id>`
eee.ps1 respawn <id>     # passthrough to `claude respawn <id>`
```

```json
// .claude/state/wave-lock-<wave>.json schema
{
  "wave": "W365",
  "session_id": "<uuid>",
  "branch": "goal/W365-sota-fanout",
  "worktree_path": "Z:/claude-sota-installed-W365",
  "started_at": "2026-05-21T14:23:00Z",
  "ttl_at": "2026-05-28T14:23:00Z",
  "owner": "operator",
  "schema_version": 1
}
```

**Error handling:**

- Cap-violation (6th worktree): hard-block in `eee.ps1` with op-message "5-worktree cap per W350 GIT-TREE-SOTA §2; close one with `git worktree remove` first."
- Duplicate wave-lock: hard-block with "wave W365 already claimed by session <id> at <ts>; use --wave W366 or expire-lock manually after verifying <id> is dead."
- `claude --bg` <4-char prompt: forward CC's native error.
- Stale wave-lock past `ttl_at`: cleanup-period sweep auto-removes if no `git worktree list` match.

**Testing:**

- E2E: `eee.ps1 --wave W999-test --slug brainstorm-fixture --no-launch` creates worktree, lock, T6 row; cleanup removes all three.
- Concurrency: spawn 2 `eee.ps1 --wave W999` in parallel — exactly one succeeds, the other gets the duplicate-lock error.
- `claude --bg` smoke: `eee.ps1 --bg "echo hello" --name test --no-launch` → confirms `claude --bg` is forwarded with correct args (uses `--no-launch` to skip actual spawn in test).

### 5.2 Wave W364 — Pattern Lift Suite (~3 days)

**Components:**

| # | Pattern | Source | Implementation | Skill/Script Path |
|---|---|---|---|---|
| 1 | `.gc_meta.json` tiered TTL GC | multica | `tools/worktree-gc.mjs` — 24h after `done`, 72h orphan, 12h artifact-only (`node_modules`/`.next`/`dist`); reads `cleanupPeriodDays` setting; runs from cron | `tools/worktree-gc.mjs` |
| 2 | `wait_agent` global-mailbox | philschmid 2026 | Local skill — orchestrator dispatches N agents, does own work, calls skill which polls `claude agents --json` + returns first-completed event; Monitor-tool-backed | `.claude/skills/wait-agent/SKILL.md` |
| 3 | AGT observability-only telemetry (NO kill-switch) | MS Agent Framework 1.0 | Extend existing agent-budget-discipline skill as PURE OBSERVABILITY — per-task / per-agent / org-monthly **trace + alert + Langfuse OTEL annotation**, but ZERO hard termination. Per operator max-quality directive; cost is observed, not capped. | `.claude/skills/agent-budget-discipline/SKILL.md` (extension) |
| 4 | Daemon-token credential class | multica `mdt_*` | Per-bg-session scoped write-token for T6 basic-memory; env-injected; short-lived | `tools/daemon-token-mint.mjs` |
| 5 | Issue-comment-as-mailbox | multica Squad model | T6 basic-memory wave-thread + structured `@mention` semantics in commit/PR bodies; no DB change | `.claude/skills/issue-mailbox/SKILL.md` |
| 6 | 8-plugin SoC architecture | Composio AO `packages/core/src/types.ts` | Cite-anchored docs reference; align `eee.ps1` extension points to Runtime / Workspace / Tracker / SCM / Notifier / Terminal / Lifecycle / Agent slot taxonomy — NO replication, just shape-alignment so Phase 2 wires cleanly | `docs/architecture/W364-8-PLUGIN-SOC-ALIGNMENT.md` |

**Interfaces:**

```javascript
// tools/worktree-gc.mjs contract
//   Scans Z:/claude-sota-installed-W* (siblings, not under main runtime)
//   For each: read .gc_meta.json (if present); compare {status, last_activity, age}
//   - status=done && age > 24h → remove
//   - status=orphan && age > 72h → remove
//   - any && artifact-only (node_modules/.next/dist) && age > 12h → prune artifacts only
//   - any && uncommitted changes → SKIP + log warning
//   Idempotent. Logs to .claude/debug/worktree-gc-YYYY-MM-DD.log
```

```markdown
<!-- .claude/skills/wait-agent/SKILL.md frontmatter -->
---
name: wait-agent
description: Use when orchestrator has dispatched 2+ Agent calls and wants to do own work while waiting; returns on first-agent-completion or N-agents-completion, not blocking-wait-all
context: inherit
tools: [Monitor, Bash, Agent]
disable-model-invocation: false
---
```

**Error handling:**

- `worktree-gc.mjs` with uncommitted changes in target: SKIP, log warning, never `--force`.
- `wait-agent` polling exceeding `--timeout`: return `{completed: [], pending: [...]}` + advisory message; do NOT kill agents.
- AGT observability threshold cross: emit Langfuse OTEL annotation + soft operator alert; record threshold-cross row in T6. NEVER kills (per max-quality directive §2).
- Daemon-token expiry mid-bg-session: bg-session continues with read-only T6 access (write fails fast); operator-alert via Langfuse trace.

**Testing:**

- `worktree-gc.mjs --dry-run` against test worktree fixtures; assert decisions match TTL table.
- `wait-agent` skill: dispatch 3 sleep-N-second agents, assert returns first-completed.
- AGT observability: simulate 110% of soft threshold; assert Langfuse OTEL annotation emitted + T6 threshold-cross row recorded + soft alert surfaced; assert NO kill occurs (per max-quality directive).
- Daemon-token: mint, write, expire, verify subsequent write fails with `daemon_token_expired`.

## 6. Phase 2 — Composio AO Wire-Up (W365 + W366)

### 6.1 Wave W365 — T3 Pattern Audit (~1-2 days)

> **T-tier gloss** (per sca-v11 candidate-audit rubric): **T1** = installed-canonical; **T2** = installed-pilot (state-outside-repo or feature-flagged); **T3** = clone-only pattern-study slot (cite-anchored, NOT installed); **T4** = cite-only without clone; **T5** = retired/rejected.

**Activities:**

1. Clone `ComposioHQ/agent-orchestrator` at `Z:/claude-sota-installed-repos/agent-orchestrator/` (cite-only slot, NOT under main runtime; CR-1 verified).
2. Read+extract:
   - `packages/core/src/types.ts` — 8-plugin interface
   - `packages/core/src/platform.ts` — Windows abstractions (ConPTY, named-pipe pty-host registry)
   - `SETUP.md` — plugin slot table
   - `.ao/activity.jsonl` schema — session event taxonomy
   - `DESIGN.md` — competitor scan + architectural rationale
   - Lifecycle Manager — `kill`/`cleanup`/`restore`/`claimPR`/`dryRun-purge`/activity-probe
3. Write `docs/architecture/W365-COMPOSIO-AO-PATTERN-AUDIT.md` capturing what we lift vs. what we leave.
4. Run `pnpm install` + native `node-pty` rebuild against current Node ABI. Capture rebuild log.
5. Run `ao doctor` on Windows + record exit code + stdout.
6. Decision gate (3 conditions, all must PASS):
   - **A.** `ao doctor` PASS on Windows-native (no WSL).
   - **B.** CR-2 verified: no project-owned hook bodies under our `.claude/hooks/**` would be required by AO wiring.
   - **C.** CR-1 verified: SLSA + npm-provenance + Socket.dev / Snyk transitive-dep scan clean.

**On all-3-PASS:** Promote to T2 pilot (W366).
**On any-FAIL:** Freeze at T3; lift only the patterns; design-doc the patterns at `docs/architecture/W365-PATTERNS-LIFTED.md`; W366 cancelled or replaced with native-only equivalent.

### 6.2 Wave W366 — T2 Pilot Install + Bridges (~3-5 days)

**Components:**

| # | Component | Path | Purpose |
|---|---|---|---|
| 1 | Composio AO install (state-outside-repo) | `Z:/claude-sota-installed-state/agent-orchestrator/` | runtime install, gitignored |
| 2 | `agent-orchestrator.yaml` config | `Z:/claude-sota-installed-state/agent-orchestrator/agent-orchestrator.yaml` | pluggable agent=claude-code+codex, workspace=worktree, runtime=process |
| 3 | Local webhook bridge | `tools/composio-bridge.mjs` (≤2 KB shim; cite-anchored to Composio webhook event spec) | bridge AO events → Langfuse OTEL spans + T6 basic-memory writes |
| 4 | Codex Stop-gate merge enforcement (Path B per W362c §P0.3) | `agent-orchestrator.yaml:reactions.approved-and-green.auto: false` + `action: notify`; `.claude/state/codex-gate-W<wave>.json` PASS-verdict file written by Stop-hook; `tools/composio-bridge.mjs` watches both and invokes `gh pr merge --merge --auto` only when BOTH true | NO auto-merge without codex GPT-5.5 round-1+2 PASS — bridge-owned merge (ReactionConfig has no `if`/predicate field per W362c §P0.2) |
| 5 | ccusage + Langfuse observability sink (NO budget kill — per max-quality §2) | `tools/agt-observer.mjs` + `agent-orchestrator.yaml:lifecycle.inactivity_threshold: 60m` (idle-only kill) | observability + soft alerts at threshold crosses; idle-only termination |
| 6 | `eee.ps1 ao` subcommand | `tools/eee.ps1` | wraps `ao spawn`/`ao session ls`/etc.; familiar PS surface |
| 7 | T6 daemon-token-scoped writes from AO sessions | reuses W364 daemon-token-mint | per-session blast-radius limit |

**Composio config (Path-B-aligned, real schema per W362c §P0.2):**

> Schema validated against `interface ReactionConfig` in `packages/core/src/types.ts` per W362c §P0.2 (TS source-of-truth, NOT illustrative). Path B is now the chosen path per W362c §P0.3 — AO auto-merge is OFF; bridge owns merge after `pr.review.green` AND `.claude/state/codex-gate-W<wave>.json` PASS-verdict together. The `approved-and-green` reaction stays in the map for notify purposes ONLY (`auto: false` + `action: notify`).

```yaml
# Z:/claude-sota-installed-state/agent-orchestrator/agent-orchestrator.yaml
# Real schema captured at docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md §P0.2;
# ReactionConfig type lacks `if` field — Path B chosen.
$schema: https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/schema/config.schema.json
port: 3457                    # bind 127.0.0.1:3457 (set via AO env or args)
defaults:
  runtime: process            # Windows-native ConPTY, no WSL2
  agent: claude-code          # pluggable; codex available as secondary
  workspace: worktree         # one worktree per agent (aligns with W342-Z L2)
  notifiers: [desktop, webhook]
lifecycle:
  autoCleanupOnMerge: false   # W364 worktree-gc.mjs is sole cleanup owner
  inactivity_threshold: 60m   # IDLE-only kill (operator override AO_INACTIVITY_THRESHOLD; see §6.3)
projects:
  sandbox-pilot:
    name: Sandbox Pilot
    repo: org/sandbox-pilot    # NOT pointed at Z:/claude-sota-installed during pilot
    path: <sandbox-repo-path>
    defaultBranch: main
    sessionPrefix: ao
notifiers:
  webhook:
    plugin: webhook
    url: http://127.0.0.1:9077/ao-event
    events: [session.start, session.complete, pr.opened, pr.merged, pr.review.green, pr.failed]
reactions:
  # Real reaction-name set is FIXED per W362c §P0.2: ci-failed | changes-requested |
  # approved-and-green | agent-stuck. ReactionConfig has NO `if` / `when` / `predicate`
  # field — Path A (custom predicate) is NOT supported. Path B chosen: bridge owns merge.
  ci-failed:
    auto: true
    action: send-to-agent
    retries: 2
    escalateAfter: 2
  changes-requested:
    auto: true
    action: send-to-agent
    escalateAfter: 30m
  approved-and-green:
    auto: false               # auto-merge OFF on AO side per W362c §P0.3 Path B
    action: notify            # AO only notifies; tools/composio-bridge.mjs owns gh pr merge
    priority: action
  agent-stuck:
    threshold: 10m
    action: notify
    priority: urgent
```

### 6.3 Observability + inactivity (no budget kill-switch — max-quality mode)

Per operator max-quality directive (§2 Design Principles), there is **NO budget hard kill-switch**. Cost/token usage is observed via ccusage MCP + Langfuse OTEL but never used as a termination trigger. Two distinct watchdog/signal shapes exist:

```
┌─────────────────────────────┐         ┌─────────────────────────────────┐
│ AO lifecycle.inactivity     │         │ Bridge AGT observability         │
│   _threshold: 60m (relaxed) │         │ tools/agt-observer.mjs            │
│                             │         │  - per-task / per-agent / org-   │
│ Kills IDLE sessions only    │         │    monthly TRACING (NOT caps)    │
│ (no pty activity, no agent  │         │  - polls mcp__ccusage__blocks    │
│  output, no spans).         │         │    every N minutes               │
│                             │         │  - on threshold cross: Langfuse  │
│ Active long-running work is │         │    OTEL annotation + soft alert  │
│ NOT killed.                 │         │    in operator surface           │
│                             │         │  - NEVER invokes session.kill    │
└─────────────────────────────┘         │  - records spend in T6 wave-row  │
                                        │    for retrospective analysis    │
                                        └─────────────────────────────────┘
```

- `inactivity_threshold` is set to a relatively relaxed value (**60m default** per W362c §P0.4, operator-overridable via env `AO_INACTIVITY_THRESHOLD=90m`) so long codex review rounds + 1M-context reasoning + parallel agent waits do not get prematurely terminated.
- Budget observability fires NO termination; only observer-side telemetry + soft alerts. Probe = `mcp__ccusage__blocks` every 60s (`AGT_OBSERVER_INTERVAL_S` env, default `60`). Langfuse OTEL event name = `agt.threshold.cross`. Severity levels = `soft-info` (50% monthly cap) + `soft-warn` (100% monthly cap); both emit Langfuse annotation + operator-surface soft alert; NEITHER kills. T6 ledger row per cross at `main/W362c/agt-threshold-crosses/{wave}/{ts}` for retrospective wave-row cost-outlier analysis.
- W362c §P0.2 confirmed: AO ships `ao stop` (no args = all sessions/projects) and `ao stop <project>` (per-project) — these are operator-only; bridge NEVER auto-invokes. No per-session `ao session kill <id>` API in the public surface. Operator falls back to `claude stop <id>` for single-session granularity.

**Bridges (critical — these preserve W342-Z and the cardinal rules):**

| Bridge | Direction | Mechanism | Cardinal Rule Reference |
|---|---|---|---|
| Composio webhook → Langfuse | AO → CC runtime | `tools/composio-bridge.mjs` POST → Langfuse `/api/public/traces` | CR-6 verify-before-claim (OTEL evidence) |
| codex Stop-hook → merge gate (Path B per W362c §P0.3) | CC → AO | **Path B (chosen)** — AO `approved-and-green.auto: false` + `action: notify` (auto-merge DISABLED on AO side; `ReactionConfig` lacks an `if`/`predicate` field per W362c §P0.2). Stop-hook writes `.claude/state/codex-gate-W<wave>.json` with `{verdict: "APPROVE"|"BLOCK", round_1_findings, round_2_findings, timestamp, pr_url}`. `tools/composio-bridge.mjs` subscribes to AO `pr.review.green` event AND watches the codex-gate verdict file together; only when BOTH `pr.review.green` AND `verdict === "APPROVE"` does the bridge invoke `gh pr merge --merge --auto <pr-url>` itself. BLOCK verdict → operator-notify, no merge. Idempotency: bridge keeps `pr_url → merged_at` row in T6 basic-memory under `main/W362c/merged-prs`. Operator can manually `gh pr merge` if gate stuck. Path A (custom predicate) rejected by P0.2 — TS schema has no extension point. | CR-6 + W331 frontier-peer |
| T6 basic-memory ↔ AO session metadata | both | daemon-token-scoped MCP writes | CR-5 + W295 T6 canonical |
| ccusage MCP + Langfuse → bridge observability sink | CC → both | Periodic `mcp__ccusage__blocks` probe; record per-task / per-agent / org-monthly spend; emit Langfuse OTEL annotation + soft operator alert at threshold-crosses; NEVER invokes session.kill (per max-quality directive §2) | CR-6 (observability evidence) |
| `eee.ps1 ao` → AO CLI | CC → AO | PowerShell passthrough; identical args | CR-2 (no hook body) |
| Composio `worktree` plugin ↔ W342-Z L1 atomic-tick-write | both | AO uses native `git worktree`; W342-Z L1 wraps rename(2) — no double-write | W342-Z architectural invariant |

**Cardinal-rule sanity gates (each verified at W366 PR review):**

- **CR-1**: Composio AO clone manifest validated via SLSA-L3 + npm-provenance + Socket.dev clean transitive scan **before** state-outside-repo install.
- **CR-2**: All AO state under `Z:/claude-sota-installed-state/agent-orchestrator/` (gitignored). Bridge at `tools/composio-bridge.mjs` ≤2 KB, cite-anchored to specific Composio webhook event spec.
- **CR-3**: IF AO exposes agents to CC's Agent tool, regenerate `tools/build-subagent-allowlist.mjs` to add `composio-ao:<name>` FQNs.
- **CR-4**: All AO config in `agent-orchestrator.yaml` (state-outside-repo). NO `.claude/rules/composio*.md`.
- **CR-5**: AO runs as separate process; CC OS-sandbox semantics unchanged. AO bind to `127.0.0.1` only.
- **CR-6**: Every wave-step verified via AO `ao session inspect <id>` stdout + `ao doctor` exit code + codex round 1+2 verdict + ccusage observability probe.

**Error handling:**

- AO churn / breaking change on next pull: freeze at last-known-good commit-pin in `agent-orchestrator.yaml`; native-CC continues unaffected.
- `node-pty` rebuild failure: documented escape hatches `AO_SHELL=bash` + `AO_BASH_PATH=C:\Program Files\Git\bin\bash.exe`; fallback to native `claude --bg`.
- `auto-merge` racing codex Stop-hook: Path B per W362c §P0.3 — AO `approved-and-green.auto: false` so AO never auto-merges; `tools/composio-bridge.mjs` only invokes `gh pr merge` when BOTH `pr.review.green` AND `.claude/state/codex-gate-W<wave>.json` PASS-verdict file are observed. No fast-path possible; no race possible because AO is no longer in the merge path.
- Webhook port :9077 collision: documented retired-hindsight-T1; if ever reclaimed, switch to :9078 (operator-config).
- Composio web dashboard exposed: bind `127.0.0.1` ONLY; OS-firewall-rule check at install-time.

**Testing:**

- Spawn 1 AO agent on a throwaway sandbox-repo issue; observe worktree create, CC launch inside, JSONL activity, PR open.
- Codex Stop-gate BLOCK test (Path B per W362c §P0.3): dispatch agent → AO opens PR → codex round 1 writes BLOCK verdict to `.claude/state/codex-gate-W<wave>.json` → AO emits `pr.review.green` webhook → `tools/composio-bridge.mjs` reads BLOCK verdict → bridge does NOT invoke `gh pr merge`; emits operator-notify event instead. Assert PR remains unmerged.
- Codex Stop-gate happy-path test (Path B per W362c §P0.3): dispatch agent → AO opens PR → codex round 1+2 PASS verdict written to `.claude/state/codex-gate-W<wave>.json` → AO emits `pr.review.green` webhook → `tools/composio-bridge.mjs` reads APPROVE verdict + sees `pr.review.green` → bridge invokes `gh pr merge --merge --auto <pr-url>`. Assert PR merged + idempotency row written in T6 `main/W362c/merged-prs`.
- Budget observability: spawn agent with 1-min activity, simulate ccusage threshold cross, assert Langfuse OTEL annotation emitted + soft alert surfaced + T6 threshold-cross row recorded; assert NO kill occurs (per max-quality directive §2).
- Composio churn fallback: simulate `ao doctor` FAIL → native `claude --bg` workflows still complete.

## 7. Risks + Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Composio AO semver churn (0.x, 3 months old) | HIGH | MED | Commit-pin in config; weekly drift probe; native-CC keeps working independently |
| AO `agent-orchestrator.yaml` schema drift / invalid config silently breaks bridge | MED | HIGH | Phase 0.2 captures real schema; pilot config validated via `ao config validate` before service start; `tools/composio-bridge.mjs` validates webhook events against captured schema with hard-fail on shape mismatch |
| AO does NOT expose custom-reaction predicates (Phase 0.3 outcome) | MED | HIGH | Path B fallback already in spec — bridge OWNS merge, AO auto-merge DISABLED; documented in §6.2 |
| `WorktreeCreate` hook semantic mismatch (would only fire for `claude --worktree`, replaces git, makes `.worktreeinclude` inert) | RESOLVED | — | Phase 0.1 outcome encoded in §5.1 — eee.ps1 owns full creation flow; NO hook used |
| `node-pty` Windows rebuild flake on Node ABI bump | MED | LOW-MED | `AO_SHELL=bash` escape hatch; fallback to native `claude --bg` |
| AO `auto-merge` races codex Stop-hook | RESOLVED | — | Path B chosen at W362c §P0.3 — AO `approved-and-green.auto: false` so AO never auto-merges; `tools/composio-bridge.mjs` owns `gh pr merge`. ReactionConfig has no `if`/predicate field per W362c §P0.2 — Path A is structurally impossible, not just deferred. |
| GitHub token scope / secret propagation via AO `env` | MED | HIGH | Operator PAT scoped to `repo` only (no `admin:org` / `delete_repo` etc.); AO env file gitignored; secrets via `gh auth login` only, never plaintext in `agent-orchestrator.yaml`; W364 daemon-token credential class limits per-session blast radius |
| Double ownership of worktree cleanup (AO `lifecycle.cleanup_on_terminate` vs. CC `WorktreeRemove` hook vs. W350 cleanupPeriodDays vs. W364 `.gc_meta.json` GC) | HIGH | MED | Single owner: W364 `tools/worktree-gc.mjs` is the authoritative cleanup loop; AO `cleanup_on_terminate: false` set during pilot to prevent races; WorktreeRemove hook only prunes git metadata, NOT the worktree dir; documented ownership matrix in W365 audit |
| AO web dashboard auth/no-auth posture | LOW | HIGH | `127.0.0.1` bind only; OS-firewall-rule check at install-time; never `0.0.0.0`; W365 confirms AO ships auth (none / basic / OAuth) and adds reverse-proxy or basic-auth shim if AO ships no auth |
| Branch naming / cap collision with W350 (AO spawning `goal/W<N>-ao-<n>` branches conflicts with operator W363 wave) | MED | MED | AO branches use distinct prefix `ao/<task-id>-` (not `goal/W<N>-`); pre-commit cr7-worktree-collision gate already enforces; W365 confirms AO branch-naming is configurable |
| Composio bridge backpressure / retry / idempotency on webhook flood | MED | MED | `tools/composio-bridge.mjs` queues events in-process with bounded buffer (1k events); each event idempotency-keyed on `(session_id, event_seq)`; T6 + Langfuse writes wrap in retry-with-backoff; bridge restart drops queue (events are derivable from `.ao/activity.jsonl`) |
| CR-2 violation (self-invented hooks) | LOW | HIGH | Bridge ≤2KB cite-anchored shim only; pre-commit gate enforces |
| Webhook port :9077 reused by future hindsight revival | LOW | LOW | Operator-config switch to :9078; documented |
| Wave-lock TTL miscalibration → live wave reclaimed | LOW | HIGH | 7-day default TTL; cleanup-sweep checks `git worktree list` match before removing lock |
| 5-worktree cap exceeded | LOW | LOW | `eee.ps1` hard-block + clear op-message |
| Sub-project drift across 4 waves | MED | MED | Each wave gets own spec→plan→implement cycle; verdict-ledger row at wave-close |
| ParallelDispatch silent-fallback continues | MED | HIGH | parallel-guard binding mode (exit-2 on 2nd consecutive solo) already shipped W330; W364 wait-agent skill reinforces |
| Budget watchdog vs. inactivity watchdog conflated | RESOLVED | — | Per max-quality directive (§2 Design Principles), there is NO budget kill-switch. Only inactivity is a kill signal. Budget is observability-only via ccusage + Langfuse. §6.3 reflects this. |
| Runaway cost from max-quality mode (no budget cap) | KNOWN-ACCEPTED | MED | Operator directive 2026-05-21 explicitly favors quality over cost cap. Mitigations: ccusage + Langfuse soft alerts at threshold crosses; operator can manually `claude stop <id>` / `ao stop [project]` at any time (per W362c §P0.2 — no per-session `ao session kill <id>` API exists; `ao stop [project]` is the real AO surface); T6 retrospective wave-row analysis surfaces cost outliers for follow-up tuning |

## 8. Sub-Projects (decomposed; each gets its own spec→plan→implement cycle)

| Wave | Title | Scope | Est. duration | Spec file (will be created) |
|---|---|---|---|---|
| **W362c** | Phase 0 — Contract Validation Gate | §3.5 above — 4 contracts (WorktreeCreate semantics · AO yaml schema · custom predicate viability · budget vs. inactivity) validated empirically | ~0.5 days | `docs/superpowers/specs/2026-05-22-W362c-contract-validation.md` |
| **W363** | Foundation Gap Closure → **COMPLETE** (codex round-4 APPROVE; commits `78c4bc7`+`ecf1770`+`efb7f29`+`7bf1e73`) | §5.1 above — eee.ps1 --Wave/--Bg/subcommand dispatcher (no WorktreeCreate hook per P0.1), race-hardened wave-lock guard (16 tests), .worktreeinclude, CLAUDE.md:14 refresh, pre-commit wave-lock-validate hook | ~2 days | plan: `docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md` |
| **W364** | Pattern Lift Suite → **COMPLETE** (codex round-2 APPROVE; commits `1109bb5`+`0914772`+`df4a60f`+`133834c`) | §5.2 above — 6 patterns lifted: worktree-gc tiered-TTL GC (containment+live-dirty hardened), wait-agent skill, AGT observability-only, daemon-token-mint, issue-mailbox skill, 8-plugin SoC doc | ~3 days | plan: `docs/superpowers/plans/2026-05-21-W364-pattern-lift-suite.md` |
| **W365** | Composio AO T3 Pattern Audit | §6.1 above — clone, study, decision gate; produces W365-COMPOSIO-AO-PATTERN-AUDIT.md (W362c §P0.2 already captured TS schema; W365 verifies `ao doctor` PASS on Windows-native + SLSA/Socket.dev scans) | ~1-2 days | `docs/superpowers/specs/2026-05-27-W365-composio-audit.md` |
| **W366** | Composio AO T2 Pilot + Bridges | §6.2 above — full wire-up; only if W365 gates PASS; bridge uses Path B (bridge-owned merge) per W362c §P0.3 | ~3-5 days | `docs/superpowers/specs/2026-05-29-W366-composio-pilot.md` |

Total: ~10.5-12.5 days across 5 waves (W362c + W363 + W364 + W365 + W366). Each ships verifiably before the next starts. W362c is a 0.5-day blocker added per codex round 1 review feedback.

## 9. Success Criteria

- **W363 ship-criteria**: `eee.ps1 --wave` round-trips successfully (creates worktree + reads `.worktreeinclude` + copies gitignored files + writes wave-lock + registers in T6 — all eee.ps1-owned, NO `WorktreeCreate` hook used per §3.5 Phase 0.1); concurrent same-wave attempts blocked; `eee.ps1 --bg` proxies `claude --bg` correctly; `CLAUDE.md:14` worktree-list dynamic.
- **W364 ship-criteria**: `worktree-gc.mjs --dry-run` reports correct decisions on fixtures; `wait-agent` skill returns first-completed of 3 dispatched agents; AGT observability emits Langfuse OTEL annotation + soft alert at simulated threshold cross with NO kill (per max-quality directive §2); daemon-token expiry causes write-fail; 8-plugin SoC alignment doc written + reviewed.
- **W365 ship-criteria**: Composio clone studied + pattern audit doc written; `ao doctor` PASS or documented FAIL with patterns-only fallback; decision gate explicit.
- **W366 ship-criteria** (if W365 PASS): Composio T2 install live; 1 throwaway-issue dispatch round-trips successfully; bridge-owned merge gate (Path B per W362c §P0.3) verified blocking (BLOCK verdict in `.claude/state/codex-gate-W<wave>.json` prevents `gh pr merge` invocation) and unblocking (APPROVE verdict + `pr.review.green` event triggers `gh pr merge --merge --auto`); `eee.ps1 ao` subcommand works.
- **Cross-cutting**: `parallel_ratio` lifted measurably toward ≥0.7 target (W325-A metric); all 6 Cardinal Rules verifiable post-W366; no W342-Z layer regressions.

## 10. Open Questions

(None at design time. To be filled if implementation surfaces ambiguities.)

## 11. References

- W342-Z 5-layer SOTA architecture: `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md`
- W350 GIT-TREE-SOTA-ARCHITECTURE: `docs/architecture/W350-*/GIT-TREE-SOTA-ARCHITECTURE.md` §2 (5-worktree cap)
- W289 claude-flow audit: `docs/architecture/W289-CLAUDE-FLOW-SOTA-AUDIT-2026-05-18.md`
- W295 OpenHands audit: `docs/architecture/W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md`
- W280h prior rejection of claude-squad/crystal/ccmanager/vibe-kanban (to revisit for Composio AO + vibe-kanban given fresh evidence)
- W259-v8 U4 four parallel modes: `CLAUDE.md:12`
- W269 + W312-D + W325-A parallel-dispatch mandate: `CLAUDE.md:14`
- W331 frontier-peer policy: `CLAUDE.md:12` + `docs/architecture/W331-*/`
- ComposioHQ/agent-orchestrator: https://github.com/ComposioHQ/agent-orchestrator (MIT, 7.2k★, daily-active 2026-05-22)
- vibe-kanban (BloopAI): https://github.com/BloopAI/vibe-kanban (Apache-2.0, 26.4k★)
- multica-ai/multica: https://github.com/multica-ai/multica (open-source, Linear-clone)
- philschmid 2026 subagent patterns: https://www.philschmid.de/subagent-patterns-2026
- MS Agent Framework 1.0 + AGT: https://github.com/microsoft/agent-framework (MIT, GA 2026-04-03)
- Anthropic claude-cookbooks `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block
- CC v2.1.140-145 changelog: https://docs.anthropic.com/en/docs/claude-code/changelog
- `/batch` command + worktree subagents: https://code.claude.com/docs/en/agents
- Skill `context: fork` + `agent:` dispatch: https://code.claude.com/docs/en/skills

---

**Spec status**: APPROVED r6 (W362c contracts validated 2026-05-21) — W363 design freeze unblocked; pending W363 brainstorming → spec → plan cycle.

**Umbrella → first-wave handoff**: This document is an **umbrella program spec** describing the (now 5-wave) roadmap. The `superpowers:writing-plans` invocation that follows approval produces the **detailed implementation plan for the FIRST wave** — W362c (Phase 0 Contract Validation), which is a 0.5-day blocker added per codex round 1 BLOCK feedback. Subsequent waves W363/W364/W365/W366 each get their own brainstorming → spec → plan → implement cycle, with each sub-spec referencing this umbrella for architectural coherence.

## 12. Review History

| Round | Reviewer | Verdict | Findings | Resolution |
|---|---|---|---|---|
| r1 | codex GPT-5.5 (high effort) | **BLOCK** | (1) WorktreeCreate flow semantically wrong (hook only fires for `claude --worktree`, replaces git, makes `.worktreeinclude` inert); (2) AO yaml schema sample incorrect; (3) `codex_gate_passed` predicate viability unverified; (4) budget kill-switch conflated with `inactivity_threshold`; (5) risk catalog missing AO schema drift / custom-reaction unavailability / token-scope propagation / cleanup-double-ownership / dashboard auth posture / branch-naming collision / bridge backpressure | r2 edits: §3.5 Phase 0 Contract Validation Gate added; §5.1 #5 reframed as eee.ps1-owned (no hook); §6.2 yaml marked illustrative + tied to Phase 0.2 + Path A/B explicit; §6.3 budget watchdog separated from inactivity; §7 risk catalog expanded with 7 new rows |
| r1.5 | operator directive 2026-05-21 | **PIVOT** | "max performance, not budget hard limit. fully unleash potential, tools use, the quality of the workflow and output is priority" | Spec re-revised: §2 Design Principles (Max-Quality Mode) added; AGT lift reframed observability-only (§5.2 #3); §6.3 reframed observability + inactivity-only (no budget kill); §6.2 yaml `inactivity_threshold` relaxed 30m→60m + `cleanup_on_terminate: false` (W364 GC sole owner); bridges table: budget watchdog row replaced with observability sink; risk catalog: budget kill-switch row marked RESOLVED via max-quality stance + runaway-cost row added as KNOWN-ACCEPTED |
| r2 | codex GPT-5.5 (high effort) | **BLOCK** | Only residual stale text — (1) error-handling AGT-budget-kill line; (2) testing AGT-budget-cap line; (3) Component #5 budget-cap=kill-switch; (4) W363/W364 ship-criteria still reference WorktreeCreate hook + AGT budget kill | r3 edits: line 238 → observability annotation no kill; line 245 → observability test no kill; line 285 → Component #5 reframed as ccusage+Langfuse observability sink no budget kill; line 382 → testing budget observability no kill; line 423-424 → W363/W364 ship-criteria explicitly say eee.ps1-owned + no AGT kill |
| r3 | codex GPT-5.5 (high effort) | **BLOCK** | Last 4 stale-text spots — (1) §2 Goals: "AGT budget tiers"; (2) §2 Goals: "ccusage budget"; (3) §6.2 CR-6: "ccusage budget probe"; (4) Spec status + review-history table out of date | r4 edits: §2 Goals line 44 → "AGT observability thresholds"; §2 Goals line 48 → "ccusage observability"; §6.2 CR-6 line 367 → "ccusage observability probe"; status + r2/r3 review-history rows added |
| r4 | codex GPT-5.5 (high effort) | **BLOCK** | Last 2 stale-text spots — (1) line 5 status header still says "Draft → spec self-review pending" contradicting r4 status footer; (2) §2 Goals line 40 still lists "WorktreeCreate hook" as a foundation gap contradicting §5.1 eee.ps1-owned. Budget/ccusage wording NOW consistent. | r5 edits: line 5 → updated to current "DRAFT r5 → codex GPT-5.5 round 5 pending → user review → writing-plans"; line 40 → "eee.ps1-owned worktree-creation flow doing .worktreeinclude copy + wave-lock write + T6 register (NOT a WorktreeCreate hook — see §3.5 Phase 0.1)"; review-history table this row added |
| r5 | codex GPT-5.5 (high effort) | **APPROVE** | "Findings: none." Verified status header + footer + review history all consistent at DRAFT r5; r4 resolution now points to current DRAFT r5; no residual stale WorktreeCreate / budget-kill text outside historical review rows; §2 / §3.5 / §5.1 / §6.2 / §6.3 / §7 internally consistent with max-quality / no-budget-cap as design constraint. | Status promoted DRAFT r5 → APPROVED r5; ready for user review → writing-plans skill invocation. |
| r6 | W362c Phase 0 contract validation | **APPROVE** | All 4 P0 contracts resolved via empirical probes (Anthropic hooks/worktrees docs + Composio AO README + canonical example yaml + ReactionConfig TS interface). | §3.5 P0.1-P0.4 marked RESOLVED with cites; §6.2 yaml + bridges row pinned to Path B; §7 `ao session kill <id>` typo corrected to `ao stop [project]`; status promoted r5 → r6. W363 design freeze unblocked. |

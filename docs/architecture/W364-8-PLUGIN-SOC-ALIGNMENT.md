# W364 — 8-Plugin SoC Alignment (Composio AO → Native Extension Points)

**Date:** 2026-05-21
**Wave:** W364 Task C6 (umbrella spec §5.2 row 6)
**Author:** Claude Code (Opus 4.7, 1M ctx)
**Status:** BOOTSTRAP — design reference for W366 Composio AO wire-up (Path B).
**Type:** Pure architecture doc. NO code. Shape-alignment only — no replication of Composio internals.

> **Purpose.** Composio AO (`ComposioHQ/agent-orchestrator`) factors agent orchestration into **8 swappable plugin slots**. This runtime already has a native primitive for each of those concerns — they were simply never named against the AO taxonomy. This doc draws the 1:1 correspondence so that the W366 bridge (`tools/composio-bridge.mjs`, Path B per W362c §P0.3) wires onto pre-existing seams rather than inventing new ones. It is the contract that lets us treat AO as **leverage, not lock-in**: every slot has a self-sufficient native fallback, so if Composio churns (HIGH risk per umbrella §7 — 0.x, 3-month-old project) the runtime keeps working unchanged.

---

## 1. Source of truth — the 8 slots

The slot taxonomy is captured verbatim at **`docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` §P0.2** (the W362c Phase-0 empirical probe), which quotes the canonical `SETUP.md § Plugin Slots` table (lines 199-218) and the authoritative TypeScript runtime schema in `packages/core/src/types.ts` (67,032 bytes, HTTP 200). The slot list, with AO's own defaults and alternatives, is:

| Slot          | AO purpose           | AO default                          | AO alternatives                                 |
| ------------- | -------------------- | ----------------------------------- | ----------------------------------------------- |
| **Runtime**   | How sessions run     | `tmux` (macOS/Linux) / `process` (Windows; ConPTY via node-pty) | `process`, `docker`, `kubernetes`, `ssh`, `e2b` |
| **Agent**     | AI coding assistant  | `claude-code`                       | `codex`, `aider`, `goose`, custom               |
| **Workspace** | Workspace isolation  | `worktree`                          | `clone`, `copy`                                 |
| **Tracker**   | Issue tracking       | `github`                            | `linear`, `jira`, custom                        |
| **SCM**       | Source control       | `github`                            | GitLab, Bitbucket (future)                      |
| **Notifier**  | Notifications        | `desktop`                           | `slack`, `discord`, `webhook`, `email`          |
| **Terminal**  | Terminal integration | `iterm2`                            | `web`, custom                                   |
| **Lifecycle** | Session lifecycle    | (core)                              | Non-pluggable                                   |

Two facts from §P0.2 constrain the wire-up and recur below:

1. **Runtime defaults to `process` (ConPTY) on Windows** — this runtime is Windows-native (CLAUDE.local.md), so the AO Runtime slot's Windows default already matches our launch model. No WSL2 inversion.
2. **`interface ReactionConfig` has no `if`/`when`/`predicate`/`condition` field** and the reaction-name set is fixed (`ci-failed` | `changes-requested` | `approved-and-green` | `agent-stuck`). Custom predicates like `codex_gate_passed` are structurally impossible in the yaml. Therefore the **SCM** and **Lifecycle** slots cannot host our codex Stop-gate inside AO — the gate stays native and the bridge owns merge (Path B). This is the single most load-bearing consequence of the alignment.

---

## 2. Mapping table

Each AO slot → the native primitive that already owns that concern, the build-state of that primitive, and what W366 adds on top.

| # | AO slot | Native primitive (already owns the concern) | Anchor path | Built? | What W366 adds (Path B) |
|---|---------|---------------------------------------------|-------------|--------|--------------------------|
| 1 | **Runtime** | `eee.ps1` launch — PowerShell process spawn of `claude`, Windows-native ConPTY (no WSL2) | `tools/eee.ps1` | YES (W363) | AO `runtime: process` reuses the same ConPTY model; `eee.ps1 ao` subcommand wraps `ao spawn`/`ao session ls` so the PS surface is unchanged |
| 2 | **Agent** | `subagent_type` allowlist + codex frontier-peer (GPT-5.5 = adversarial-review authority per W331) | `.claude/state/subagent-type-allowlist.json`, `tools/preagent-subagent-validator.mjs` | YES (W340) | If AO exposes agents to CC's Agent tool, regenerate allowlist with `composio-ao:<name>` FQNs (CR-3); AO `defaults.agent: claude-code` + `worker.agent: codex` keeps codex in the loop |
| 3 | **Workspace** | `eee.ps1 --wave <Wn>` worktree-creation (git worktree add + `.worktreeinclude` copy + wave-lock + T6 register, all eee.ps1-owned — NO `WorktreeCreate` hook per W362c §P0.1) | `tools/eee.ps1`, `.worktreeinclude` | YES (W363) | AO `workspace: worktree` produces one worktree per agent, aligning with W342-Z L2; W342-Z L1 atomic-tick-write wraps `rename(2)` so no double-write |
| 4 | **Tracker** | GitHub Issues + T6 basic-memory wave-threads (durable shared substrate) | `gh` CLI + `mcp__basic-memory__*`, `.claude/skills/issue-mailbox/SKILL.md` (C5 — sibling task) | PARTIAL (gh + T6 live; issue-mailbox skill is W364 C5) | AO `tracker: github` (its default) reads/writes the same Issues; the C5 `@mention`/wave-thread convention is the cross-session async layer AO doesn't provide |
| 5 | **SCM** | git + pre-commit gates + codex Stop-gate (W280a) | `git`, `.pre-commit-config.yaml`, codex Stop-hook → `.claude/state/codex-gate-W<wave>.json` | YES | **Path B**: AO `approved-and-green.auto: false` (auto-merge OFF — `ReactionConfig` has no predicate field per §P0.2); bridge invokes `gh pr merge --merge --auto` only when BOTH `pr.review.green` event AND codex APPROVE verdict observed |
| 6 | **Notifier** | Langfuse OTEL traces + ccusage observability (observability-only, NO kill — max-quality §2) | `mcp__ccusage__blocks`, Langfuse v3.160.0 @ `:3000`, `.claude/skills/agent-budget-discipline/SKILL.md` (C3 AGT section) | PARTIAL (Langfuse + ccusage live; AGT section is W364 C3) | AO `notifiers: [desktop, webhook]` → webhook posts to `:9077` → `tools/composio-bridge.mjs` → Langfuse `/api/public/traces`; `agt.threshold.cross` annotation, never-kill |
| 7 | **Terminal** | `claude agents` view (native, v2.1.145) — list/logs/attach/stop of `--bg` sessions | `claude agents`/`logs`/`attach`/`stop`, proxied via `eee.ps1 agents`/`logs`/… | YES (W363 proxies) | Composio web dashboard (`127.0.0.1:3457`) is the future optional operator surface (W366); native `claude agents` remains the no-Composio fallback |
| 8 | **Lifecycle** | wave-lock guard + worktree-gc + daemon-token (multi-owner, native) | `tools/preagent-wave-lock-guard.mjs` (W363), `tools/worktree-gc.mjs` (C1), `tools/daemon-token-mint.mjs` (C4 — sibling task) | PARTIAL (wave-lock + worktree-gc built; daemon-token is W364 C4) | AO `lifecycle.autoCleanupOnMerge: false` + `inactivity_threshold: 60m` (idle-only kill per §P0.4); `worktree-gc.mjs` is the **sole** cleanup owner (resolves the §7 double-ownership risk) |

**Build-state legend:** YES = primitive landed and verified on this branch; PARTIAL = base substrate live, the W364-specific layer (C1/C3/C4/C5) is the increment.

---

## 3. Per-slot rationale

### 3.1 Runtime → `eee.ps1` launch (process, native ConPTY)
`eee.ps1` is the runtime's process-launch boundary: it sets the Z:-portable ENV block, resolves Git Bash on C:, and spawns `claude` directly as a Windows process. AO's Runtime slot defaults to `process` on Windows (ConPTY via node-pty per §P0.2) — the same model, so there is no runtime impedance mismatch and no WSL2 dependency. W366 adds an `eee.ps1 ao` passthrough subcommand so the operator keeps one launcher surface whether spawning native `claude --bg` or `ao spawn`.

### 3.2 Agent → subagent_type allowlist + codex frontier-peer
The Agent slot is "which AI does the work." Natively this is governed by the `subagent_type` allowlist (174 FQN entries + legacy aliases, validated pre-flight by `preagent-subagent-validator.mjs` with hard-block exit-2 on unknown types per CR-3) plus codex GPT-5.5 as the cross-model adversarial-review authority (W331 frontier-peer policy). AO's `defaults.agent: claude-code` with a `worker.agent: codex` role override maps cleanly: claude-code orchestrates, codex reviews. W366's only Agent-slot obligation is CR-3 — if AO surfaces agents into CC's Agent tool, the allowlist is regenerated with `composio-ao:<name>` FQNs so the validator still gates them.

### 3.3 Workspace → `eee.ps1 --wave` worktree-creation (W363)
The Workspace slot is isolation. W363 made `eee.ps1 --wave <Wn>` the owner of the full worktree-creation flow: `git worktree add` + read `.worktreeinclude` + copy gitignored files + write the wave-lock + register a T6 wave-thread. This is deliberately **not** a `WorktreeCreate` hook — W362c §P0.1 established that the hook fires only for `claude --worktree`/subagent-isolation and would make `.worktreeinclude` inert. AO's `workspace: worktree` default produces one worktree per agent, which is exactly W342-Z L2; the W342-Z L1 atomic-tick-write (`rename(2)`) is the shared invariant that prevents AO and the runtime from double-writing the same worktree state.

### 3.4 Tracker → GitHub Issues + T6 wave-threads (C5)
The Tracker slot is work-item state. AO defaults to `tracker: github`, and the runtime already uses GitHub Issues via `gh`. The native addition is the C5 `issue-mailbox` skill: a **durable shared substrate** (T6 basic-memory wave-thread + `Coord-Mention: @<agent-or-wave>` commit/PR trailers) for cross-session, async coordination — stigmergy when a real-time mailbox is unavailable. AO and the runtime read the same Issues; the wave-thread is the layer AO does not provide and the bridge writes into via daemon-token-scoped T6 writes.

### 3.5 SCM → git + pre-commit gates + codex Stop-gate
The SCM slot is source-control + merge policy. Natively: git, the `.pre-commit-config.yaml` security gate (gitleaks/ruff/shellcheck + CR-2 2KB-hook + cr7-worktree-collision), and the W280a codex Stop-gate that writes `.claude/state/codex-gate-W<wave>.json`. This slot is where Path B is forced: because `ReactionConfig` has no predicate field (§P0.2), AO **cannot** express "merge only if codex approved." So AO auto-merge is disabled (`approved-and-green.auto: false`, `action: notify`) and `tools/composio-bridge.mjs` owns the merge — invoking `gh pr merge --merge --auto` only when BOTH the AO `pr.review.green` webhook AND a codex `verdict === "APPROVE"` are present (idempotency-keyed in T6 `main/W362c/merged-prs`). The W331 frontier-peer authority stays native; AO is removed from the merge path entirely, so no auto-merge/codex race is possible.

### 3.6 Notifier → Langfuse OTEL + ccusage observability (C3)
The Notifier slot is "tell someone something happened." The runtime's notification substrate is observability-only per the max-quality directive (umbrella §2): ccusage spend probes (`mcp__ccusage__blocks`) + Langfuse v3.160.0 OTEL traces, surfaced through the C3 AGT-observability section of `agent-budget-discipline`. Crucially this slot **never kills** — `soft-info` (50%) / `soft-warn` (100%) thresholds emit an `agt.threshold.cross` Langfuse annotation + operator alert, nothing more. AO's `notifiers: [desktop, webhook]` feeds the same sink: the webhook posts AO events to `:9077`, `composio-bridge.mjs` forwards them to Langfuse `/api/public/traces`, preserving CR-6 (verify-before-claim via OTEL evidence).

### 3.7 Terminal → `claude agents` view (native) + future Composio web (W366)
The Terminal slot is the operator's session-monitoring surface. Natively this is the CC `claude agents` view (v2.1.145) for listing/logs/attach/stop of `--bg` sessions, proxied through `eee.ps1 agents`/`logs`/`attach`/`stop` for a familiar PS surface. AO's Terminal default is `iterm2` (macOS) with a `web` alternative; on Windows the operator surface W366 adds is the Composio web dashboard bound to `127.0.0.1:3457` (firewall-checked, never `0.0.0.0`). The native `claude agents` view remains the zero-Composio fallback, so monitoring never depends on AO being up.

### 3.8 Lifecycle → wave-lock guard (W363) + worktree-gc (C1) + daemon-token (C4)
The Lifecycle slot — non-pluggable AO core — is session/worktree birth-and-death. Natively this is three primitives: the W363 wave-lock guard (cross-session claim + TTL preventing two sessions clobbering one wave), the C1 `worktree-gc.mjs` tiered TTL GC (24h done / 72h orphan / 12h artifact-only; never `--force` on uncommitted), and the C4 daemon-token credential class (per-bg-session scoped, short-lived T6 write-token bounding blast radius — a defense-in-depth scope, NOT a CR-5 security boundary). The §7 double-ownership risk (AO cleanup vs `WorktreeRemove` hook vs cleanupPeriodDays vs `.gc_meta.json`) is resolved by declaring `worktree-gc.mjs` the **single authoritative cleanup loop**; AO runs `autoCleanupOnMerge: false` and only `inactivity_threshold: 60m` (idle-only, per §P0.4) can kill a session — active long-running work is never terminated.

---

## 4. Why this makes the W366 bridge wire cleanly

- **Every slot has a named native owner**, so the bridge subscribes to existing seams (webhook → Langfuse, codex-gate file → merge) rather than introducing new control flow. `tools/composio-bridge.mjs` stays a ≤2 KB cite-anchored shim (CR-2).
- **Two slots stay native by necessity** (SCM merge-gate and Lifecycle kill-policy) because §P0.2 proved AO cannot host custom predicates and the max-quality directive forbids budget-kill. Path B encodes exactly this: AO notifies, the runtime decides.
- **Every slot has a self-sufficient fallback** (native `claude --bg`, native `claude agents`, native git merge, native worktree-gc), so AO churn degrades to native-only operation with zero data loss — the umbrella §7 "Composio AO semver churn" mitigation.
- **The Cardinal Rules map onto specific slots**: CR-3 → Agent (allowlist regen), CR-2 → Notifier/Terminal (bridge shim ≤2 KB, no hook body), CR-5 → Lifecycle (daemon-token is scope not boundary), CR-6 → Notifier + SCM (OTEL + codex verdict evidence). The bridge cannot violate a Cardinal Rule without crossing a slot boundary that this table makes explicit.

---

## 5. References

- 8-slot source (authoritative): `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` §P0.2 — `SETUP.md § Plugin Slots` lines 199-218 + `packages/core/src/types.ts` `interface ReactionConfig`.
- Umbrella program spec: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` §5.2 (row 6), §6.2 (bridges), §6.3 (observability), §7 (risks).
- W364 implementation plan: `docs/superpowers/plans/2026-05-21-W364-pattern-lift-suite.md` Task C6.
- W362c §P0.1 (WorktreeCreate semantics → eee.ps1-owned creation), §P0.3 (Path B chosen), §P0.4 (inactivity 60m + observability sink shape).
- W363 foundation gap closure: `tools/eee.ps1`, `tools/preagent-wave-lock-guard.mjs` (atomic-write reference impl, commit `7bf1e73`).
- W342-Z 5-layer SOTA architecture: `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (L1 atomic-tick-write, L2 worktree topology).
- W331 frontier-peer policy + CR-1..CR-6: `CLAUDE.md` (codex GPT-5.5 = adversarial-review authority; subagent allowlist `.claude/state/subagent-type-allowlist.json`).
- ComposioHQ/agent-orchestrator: https://github.com/ComposioHQ/agent-orchestrator (MIT).

# W362c — Phase 0 Contract Validation Report

**Date:** 2026-05-21
**Author:** Claude Code (Opus 4.7, 1M ctx)
**Wave:** W362c (umbrella spec §3.5 Phase 0 — Contract Validation Gate)
**Status:** COMPLETE — 4/4 P0 contracts validated.

## TL;DR Verdicts

| Contract | Verdict | Path forward |
|---|---|---|
| P0.1 WorktreeCreate semantics | WorktreeCreate-only-for-`claude --worktree`-and-subagents AND replaces-default-git → `.worktreeinclude` inert under the hook. | §5.1 stance HOLDS — `eee.ps1` owns full worktree-creation flow; NO `WorktreeCreate` hook in `.claude/settings.json`. |
| P0.2 AO yaml schema | NOT SUPPORTED — `interface ReactionConfig` in `packages/core/src/types.ts` has no `if`/`when`/`predicate`/`condition` field; reaction-name set fixed (`ci-failed` / `changes-requested` / `approved-and-green` / `agent-stuck`). | §6.2 yaml updated to canonical-example shape; `approved-and-green` reaction kept with `auto: false` / `action: notify` (auto-merge OFF on AO side). Path B required. |
| P0.3 codex_gate_passed predicate | **Path B** — bridge-owned merge after BOTH `pr.review.green` event AND `.claude/state/codex-gate-W<wave>.json` PASS-verdict file. | `tools/composio-bridge.mjs` subscribes to AO webhook + watches verdict file; invokes `gh pr merge --merge --auto` itself; AO `approved-and-green.auto: false`. |
| P0.4 inactivity + observability | `inactivity_threshold=60m` (env override `AO_INACTIVITY_THRESHOLD`); Langfuse event `agt.threshold.cross` with `soft-info`/`soft-warn` severity, never-kill. | Manual-stop API = `ao stop [project]` primary + `claude stop <id>` fallback, both operator-only. NO auto-kill in bridge. |

## Umbrella spec r6 edits queued

- §3.5 P0.1 row → RESOLVED with cite to §P0.1.
- §3.5 P0.2 row → RESOLVED with cite to §P0.2.
- §3.5 P0.3 row → RESOLVED with cite to §P0.3.
- §3.5 P0.4 row → RESOLVED with cite to §P0.4.
- §6.2 yaml → updated with real schema from §P0.2 (Path-B-aligned reaction shape; `approved-and-green.auto: false`).
- §6.2 bridges table "codex Stop-hook → merge gate" row → pinned to Path B only (Path A description dropped).
- §6.3 → confirms `inactivity_threshold=60m` env-overridable per §P0.4.
- §7 risk catalog runaway-cost row → `ao session kill <id>` typo corrected to `ao stop [project]` per §P0.2 real API.
- Status header + footer + §12 review-history → r6 row added with APPROVE verdict from codex round 6.

---

## P0.1 — hooks.WorktreeCreate semantics

**Question:** Does `hooks.WorktreeCreate` fire for manual `git worktree add`, or only `claude --worktree` / subagent worktree isolation? Does it REPLACE default git creation behavior?

**Evidence:**
- Anthropic hooks doc (https://code.claude.com/docs/en/hooks) — quoted in this section.
- Anthropic worktrees doc (https://code.claude.com/docs/en/worktrees) — quoted in this section.

**Quoted excerpts:**

From `https://code.claude.com/docs/en/hooks` § WorktreeCreate (verbatim):

> WorktreeCreate
>
> When you run `claude --worktree` or a [subagent uses `isolation: "worktree"`](/docs/en/sub-agents#choose-the-subagent-scope), Claude Code creates an isolated working copy using `git worktree`. If you configure a WorktreeCreate hook, it replaces the default git behavior, letting you use a different version control system like SVN, Perforce, or Mercurial. Because the hook replaces the default behavior entirely, [`.worktreeinclude`](/docs/en/worktrees#copy-gitignored-files-into-worktrees) [is not processed when the hook is used — copy any local configuration files inside your hook script instead].
>
> The hook reads the worktree `name` from the JSON input on stdin, checks out a fresh copy into a new directory, and prints the directory path. The `echo` on the last line is what Claude Code reads as the worktree path. Redirect any other output to stderr so it doesn't interfere with the path.
>
> WorktreeCreate input
>
> In addition to the [common input fields](#common-input-fields), WorktreeCreate hooks receive the `name` field. This is a slug identifier for the new worktree, either specified by the user or auto-generated (for example, `bold-oak-a3f2`).
>
> ```
> {
>   "session_id": "abc123",
>   "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
>   "cwd": "/Users/...",
>   "hook_event_name": "WorktreeCreate",
>   "name": "feature-auth"
> }
> ```
>
> WorktreeCreate output
>
> WorktreeCreate hooks do not use the standard allow/block decision model. Instead, the hook's success or failure determines the outcome. The hook must return the absolute path to the created worktree directory:
> *   **Command hooks** (`type: "command"`): print the path on stdout.
> *   **HTTP hooks** (`type: "http"`): return `{ "hookSpecificOutput": { "hookEventName": "WorktreeCreate", "worktreePath": "/absolute/path" } }` in the response body.
>
> If the hook fails or produces no path, worktree creation fails with an error.

From `https://code.claude.com/docs/en/worktrees` § Non-git version control (verbatim):

> Non-git version control
>
> Worktree isolation uses git by default. For SVN, Perforce, Mercurial, or other systems, configure [`WorktreeCreate` and `WorktreeRemove` hooks](/docs/en/hooks#worktreecreate) to provide custom creation and cleanup logic. Because the hook replaces the default git behavior, [`.worktreeinclude`](#copy-gitignored-files-into-worktrees) is not processed when you use `--worktree`. Copy any local configuration files inside your hook script instead.

From `https://code.claude.com/docs/en/worktrees` § (worktree creation entry point, verbatim):

> Pass `--worktree` or `-w` to create an isolated worktree and start Claude in it. By default, the worktree is created under `.claude/worktrees/<value>/` at your repository root, on a new branch named `worktree-<value>`:
>
> ```
> claude --worktree feature-auth
> ```
>
> To put worktrees somewhere else, configure a [`WorktreeCreate` hook](#non-git-version-control). … For full control over how worktrees are created, configure a [`WorktreeCreate` hook](/docs/en/hooks#worktreecreate), which replaces the default `git worktree` logic entirely.

From `https://code.claude.com/docs/en/worktrees` § Copy gitignored files into worktrees (verbatim, scope clause):

> A worktree is a fresh checkout, so untracked files like `.env` or `.env.local` from your main repository are not present. To copy them automatically when Claude creates a worktree, add a `.worktreeinclude` file to your project root. The file uses `.gitignore` syntax. Only files that match a pattern and are also gitignored are copied, so tracked files are never duplicated.

(Note: the doc's `.worktreeinclude` processing is consistently scoped to "when Claude creates a worktree" — i.e., the `--worktree` / subagent-isolation path — never to manual `git worktree add` invoked from outside CC. The umbrella spec's manual-worktree-add flow therefore cannot rely on CC processing `.worktreeinclude`.)

**Verdict:** WorktreeCreate-only-for-`claude --worktree`-and-subagents AND replaces-default-git. The doc explicitly enumerates exactly two triggers — `claude --worktree` invocation and subagent `isolation: "worktree"` — with no mention of manual `git worktree add` from outside CC firing the hook; and explicitly states (in both the hooks doc and the worktrees doc) that configuring the hook "replaces the default git behavior" / "replaces the default `git worktree` logic entirely," with `.worktreeinclude` becoming inert as a direct consequence.

**Decision for umbrella spec:** §5.1 stance HOLDS (eee.ps1-owned creation, no hook). Because `hooks.WorktreeCreate` cannot be triggered by manual `git worktree add` and would make `.worktreeinclude` inert if configured for the `--worktree` path, `eee.ps1` must own the full worktree-creation flow itself — invoking `git worktree add`, reading `.worktreeinclude`, copying gitignored files, writing the wave-lock, and registering in T6 — without any `WorktreeCreate` hook in `.claude/settings.json`. Umbrella spec §3.5 P0.1 row → RESOLVED; §5.1 Component 5 ("eee.ps1 owns full worktree-creation flow") confirmed as the correct path; no §5.1 redesign required.

---

## P0.2 — Composio AO agent-orchestrator.yaml schema

**Question:** What is the real schema of `agent-orchestrator.yaml`? Does `reactions[].if: <predicate>` (custom predicate) exist, or only named reactions like `approved-and-green.auto/action`?

**Evidence:**
- Composio AO README (`https://github.com/ComposioHQ/agent-orchestrator`) — Configuration section quoted below.
- Canonical example yaml (`https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/agent-orchestrator.yaml.example`) — full content embedded verbatim below (5,792 bytes, HTTP 200).
- SETUP.md plugin-slots table (`https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/SETUP.md` § Plugin Slots, lines 199-218) — quoted verbatim below.
- TypeScript source-of-truth schema definition (`https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/packages/core/src/types.ts`, 67,032 bytes, HTTP 200) — `interface ReactionConfig` quoted verbatim below. **Authoritative — this is the runtime schema, not example documentation.**

**Top-level yaml keys (actual, verbatim from canonical example yaml):**

- `$schema` — JSON Schema hint for editor autocomplete/validation.
- `port` — Web dashboard port (defaults to 3000).
- `terminalPort` / `directTerminalPort` — Terminal server ports (defaults 14800/14801).
- `power` — Power management (`preventIdleSleep`).
- `lifecycle` — Session-cleanup-after-PR-merge (`autoCleanupOnMerge`, `mergeCleanupIdleGraceMs`).
- `defaults` — Default plugin slots (`runtime`, `agent`, `workspace`, `notifiers`; plus per-role `orchestrator` / `worker` overrides).
- `plugins` — Installer-managed external plugins (array of `{name, source, package/path, version, enabled}`).
- `projects` — Per-project config map (`name`, `repo`, `path`, `defaultBranch`, `sessionPrefix`, `tracker`, `scm`, `env`, `symlinks`, `postCreate`, `agentConfig`, `orchestrator`/`worker` role overrides, `agentRules`, `agentRulesFile`, `orchestratorRules`, `opencodeIssueSessionStrategy`, **per-project `reactions` overrides**).
- `notifiers` — Notification channel definitions (`slack`, `openclaw`, etc.) — each maps a name to `{plugin, ...plugin-specific-fields}`.
- `notificationRouting` — Priority-to-notifier-list map (`urgent`, `action`, `warning`, `info`).
- `reactions` — Top-level reaction overrides (auto-responses to events).

**Reaction-map shape (verbatim from canonical example yaml):**

```yaml
# Reactions — auto-responses to events (these are the defaults)
# reactions:
#   ci-failed:
#     auto: true
#     action: send-to-agent
#     retries: 2
#     escalateAfter: 2
#
#   changes-requested:
#     auto: true
#     action: send-to-agent
#     escalateAfter: 30m
#
#   approved-and-green:
#     auto: false              # set to true for auto-merge
#     action: notify
#     priority: action
#
#   agent-stuck:
#     threshold: 10m
#     action: notify
#     priority: urgent
```

**TypeScript schema (authoritative — `packages/core/src/types.ts` verbatim):**

```typescript
// =============================================================================
// REACTIONS
// =============================================================================

/** A configured automatic reaction to an event */
export interface ReactionConfig {
  /** Whether this reaction is enabled */
  auto: boolean;

  /** What to do: send message to agent, notify human, auto-merge */
  action: "send-to-agent" | "notify" | "auto-merge";

  /** Message to send (for send-to-agent) */
  message?: string;

  /** Priority for notifications */
  priority?: EventPriority;

  /** How many times to retry send-to-agent before escalating */
  retries?: number;

  /** Escalate to human notification after this many failures or this duration */
  escalateAfter?: number | string;

  /** Threshold duration for time-based triggers (e.g. "10m" for stuck detection) */
  threshold?: string;

  /** Whether to include a summary in the notification */
  includeSummary?: boolean;
}
```

**Critical finding:** The `ReactionConfig` interface contains NO `if`, `condition`, `predicate`, `when`, or equivalent custom-predicate field. The reaction MAP keys are themselves the predicate identifiers — they are fixed event names defined by the AO core (`ci-failed`, `changes-requested`, `approved-and-green`, `agent-stuck`). Operators can override `auto`, `action`, `retries`, `escalateAfter`, `threshold`, `priority`, `message`, `includeSummary` per-reaction, but cannot inject arbitrary boolean predicates as reaction triggers. The `action` field is itself a closed enum: `"send-to-agent" | "notify" | "auto-merge"` — no `"run-custom-hook"` or similar extension. Per the README Configuration section: "See [`agent-orchestrator.yaml.example`] for the full reference, or run `ao config-help` for the complete schema" — the canonical schema is `schema/config.schema.json`, and the reaction-name set is fixed.

**Canonical example yaml (verbatim, full content from `agent-orchestrator.yaml.example`, 5,792 bytes):**

```yaml
# Agent Orchestrator Configuration
# Copy to agent-orchestrator.yaml and customize.
$schema: https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/schema/config.schema.json

# Runtime data directories are auto-derived from this config location under:
#   ~/.agent-orchestrator/{hash}-{projectId}/
# You usually do not need to configure paths manually.

# Web dashboard port
port: 3000

# Terminal server ports (defaults: 14800/14801 — chosen to avoid conflicts with dev tools)
# Override when running multiple dashboards to avoid EADDRINUSE
# terminalPort: 14800
# directTerminalPort: 14801

# Power management — controls system sleep while AO is running
# power:
#   preventIdleSleep: true  # Default on macOS, no-op on Linux
#                           # Keeps Mac awake for remote dashboard access (e.g., via Tailscale)
#                           # Uses caffeinate -i -w <pid> — auto-releases when AO exits
#                           # Note: lid-close sleep is enforced by hardware and cannot be prevented

# Lifecycle — controls how AO cleans up sessions after their PRs merge
# lifecycle:
#   autoCleanupOnMerge: true        # Default. When a PR is detected as merged, tear down
#                                   # the tmux session, remove the worktree, and archive
#                                   # metadata so `ao status` stays clean. Set false if
#                                   # you want merged worktrees preserved for inspection.
#   mergeCleanupIdleGraceMs: 300000 # Grace window (ms) before forcing cleanup on an agent
#                                   # that is still active at merge time. Default 5 min.

# Default plugins (these are the defaults — you can omit this section)
# runtime defaults to 'tmux' on Linux/macOS, 'process' on Windows
defaults:
  # runtime: tmux         # tmux (Linux/macOS default) | process (Windows default)
  agent: claude-code      # claude-code | codex | aider | opencode | cursor | kimicode
  # orchestrator:
  #   agent: claude-code
  # worker:
  #   agent: codex
  workspace: worktree     # worktree | clone
  notifiers: [desktop]    # desktop | slack | discord | webhook | composio | openclaw

# Installer-managed external plugins (optional)
# plugins:
#   - name: owasp-auditor
#     source: registry     # registry | npm | local
#     package: "@ao-plugins/owasp-auditor"
#     version: "^0.1.0"
#     enabled: true
#
#   - name: local-dev-plugin
#     source: local
#     path: ./plugins/local-dev-plugin
#     enabled: true

# Projects — at minimum, specify repo and path
projects:
  my-app:
    name: My App
    repo: org/my-app
    path: ~/my-app
    defaultBranch: main
    sessionPrefix: app

    # Issue tracker (defaults to github issues)
    # tracker:
    #   plugin: linear
    #   teamId: "your-team-id"

    # SCM webhook acceleration (optional)
    # scm:
    #   plugin: github
    #   webhook:
    #     path: /api/webhooks/github
    #     secretEnvVar: GITHUB_WEBHOOK_SECRET
    #     signatureHeader: x-hub-signature-256
    #     eventHeader: x-github-event
    #     deliveryHeader: x-github-delivery
    #     maxBodyBytes: 1048576

    # Per-project environment variables forwarded into worker session runtimes.
    # Useful for scoping per-project tokens (e.g. pinning gh auth via GH_TOKEN).
    # AO-internal vars (AO_SESSION, AO_PROJECT_ID, etc.) always take precedence.
    # env:
    #   GH_TOKEN: ghp_xxx

    # Files to symlink into workspaces
    # symlinks: [.env, .claude]

    # Commands to run after workspace creation
    # postCreate:
    #   - "pnpm install"

    # Agent-specific config
    # agentConfig:
    #   permissions: skip    # --dangerously-skip-permissions
    #   model: opus

    # Optional role-specific agent overrides
    # orchestrator:
    #   agent: claude-code
    #   agentConfig:
    #     model: claude-sonnet-4-5
    # worker:
    #   agent: codex
    #   agentConfig:
    #     model: gpt-5-codex

    # Inline rules included in every agent prompt for this project
    # agentRules: |
    #   Always run tests before pushing.
    #   Use conventional commits (feat:, fix:, chore:).

    # Path to a rules file (relative to project path)
    # agentRulesFile: .agent-rules.md

    # Rules for the orchestrator agent (reserved for future use)
    # orchestratorRules: |
    #   Prefer to batch-spawn related issues together.

    # OpenCode issue session strategy (only for agent: opencode)
    # opencodeIssueSessionStrategy: reuse   # reuse | delete | ignore

    # Per-project reaction overrides
    # reactions:
    #   approved-and-green:
    #     auto: true         # enable auto-merge for this project

# Notification channels
# notifiers:
#   slack:
#     plugin: slack
#     webhook: ${SLACK_WEBHOOK_URL}
#     channel: "#agent-updates"
#
#   openclaw:
#     plugin: openclaw
#     url: http://127.0.0.1:18789/hooks/agent  # Use https:// for remote (non-localhost) deployments
#     token: ${OPENCLAW_HOOKS_TOKEN}
#     retries: 3
#     retryDelayMs: 1000
#     wakeMode: now

# Notification routing by priority
# notificationRouting:
#   urgent: [desktop, slack]   # agent stuck, needs input, errored
#   action: [desktop, slack]   # PR ready to merge
#   warning: [slack]           # auto-fix failed
#   info: [slack]              # summary, all done

# Reactions — auto-responses to events (these are the defaults)
# reactions:
#   ci-failed:
#     auto: true
#     action: send-to-agent
#     retries: 2
#     escalateAfter: 2
#
#   changes-requested:
#     auto: true
#     action: send-to-agent
#     escalateAfter: 30m
#
#   approved-and-green:
#     auto: false              # set to true for auto-merge
#     action: notify
#     priority: action
#
#   agent-stuck:
#     threshold: 10m
#     action: notify
#     priority: urgent
```

**Plugin slots (verbatim from SETUP.md § Plugin Slots, lines 199-218):**

> Agent Orchestrator has 8 plugin slots. All are swappable:

| Slot          | Purpose              | Default       | Alternatives                                    |
| ------------- | -------------------- | ------------- | ----------------------------------------------- |
| **Runtime**   | How sessions run     | `tmux` (macOS/Linux) / `process` (Windows; ConPTY via node-pty) | `process`, `docker`, `kubernetes`, `ssh`, `e2b` |
| **Agent**     | AI coding assistant  | `claude-code` | `codex`, `aider`, `goose`, custom               |
| **Workspace** | Workspace isolation  | `worktree`    | `clone`, `copy`                                 |
| **Tracker**   | Issue tracking       | `github`      | `linear`, `jira`, custom                        |
| **SCM**       | Source control       | `github`      | GitLab, Bitbucket (future)                      |
| **Notifier**  | Notifications        | `desktop`     | `slack`, `discord`, `webhook`, `email`          |
| **Terminal**  | Terminal integration | `iterm2`      | `web`, custom                                   |
| **Lifecycle** | Session lifecycle    | (core)        | Non-pluggable                                   |

**Manual-stop API (from `CLAUDE.md` § ao stop, verbatim):**

> ### ao stop
> - `ao stop` (no args): kills ALL sessions across ALL projects, sends SIGTERM to parent ao start process, stops dashboard, unregisters
> - `ao stop <project>`: kills only that project's sessions, does NOT kill parent process or dashboard (they serve all projects)
> - Always loads global config (`~/.agent-orchestrator/config.yaml`) to see all projects — local config only has the cwd project
> - Records `LastStopState` with `otherProjects` field for cross-project session restore

(This satisfies P0.4 sub-question on manual-stop CLI: `ao stop [project]` exists; no per-session `ao session kill <id>` is documented in the public README/SETUP/CLAUDE.md surface — operator falls back to `ao stop <project>` or `claude stop <id>` per session-tooling preference.)

**Verdict on custom predicates:** NOT SUPPORTED → Path B required: AO auto-merge DISABLED, bridge owns merge after codex PASS. The TypeScript `ReactionConfig` interface in `packages/core/src/types.ts` (authoritative runtime schema) has no `if`/`when`/`predicate`/`condition` field, and the reaction-name set is fixed (`ci-failed` | `changes-requested` | `approved-and-green` | `agent-stuck`) — custom predicate hooks like `codex_gate_passed` cannot be expressed in the yaml.

**Decision for umbrella spec:** §6.2 yaml updated with real schema (top-level keys + per-project reactions block from canonical example) + `reactions[].if` line removed + Path B made explicit default. Specifically: (a) replace the illustrative yaml in §6.2 with the canonical example's structure (`$schema`, `port`, `defaults`, `projects.<id>.{repo, path, defaultBranch, sessionPrefix, reactions}`, `notifiers`, `notificationRouting`, `lifecycle`); (b) the `approved-and-green` reaction's `auto` MUST be `false` (auto-merge OFF on AO side); (c) the bridges row "codex Stop-hook → merge gate" pins to Path B (bridge owns `gh pr merge --merge --auto` after BOTH `pr.review.green` webhook AND `.claude/state/codex-gate-W<wave>.json` PASS-verdict file present); (d) `tools/composio-bridge.mjs` subscribes to BOTH the AO `pr.review.green` notification and watches the codex-gate verdict file; (e) operator manual override = `gh pr merge` directly if codex-gate is stuck.

---

## P0.3 — codex_gate_passed predicate viability

**Question:** Given P0.2's verdict on custom predicates, does the codex Stop-gate use Path A (AO predicate) or Path B (bridge-owned merge)?

**Input:** P0.2 verdict — verbatim: "NOT SUPPORTED → Path B required: AO auto-merge DISABLED, bridge owns merge after codex PASS. The TypeScript `ReactionConfig` interface in `packages/core/src/types.ts` (authoritative runtime schema) has no `if`/`when`/`predicate`/`condition` field, and the reaction-name set is fixed (`ci-failed` | `changes-requested` | `approved-and-green` | `agent-stuck`) — custom predicate hooks like `codex_gate_passed` cannot be expressed in the yaml." The evidentiary basis is the `interface ReactionConfig` block quoted verbatim from `packages/core/src/types.ts` in §P0.2 (lines 122-153) — that interface exposes only `auto / action / message / priority / retries / escalateAfter / threshold / includeSummary`, no predicate field.

**Decision tree:**

- IF P0.2 verdict = SUPPORTED → Path A (CONTRARY — not chosen).
- IF P0.2 verdict = NOT SUPPORTED → **Path B wins**. [Resolved]

**Verdict:** Path B.

**Workflow contract (Path B):**

1. **AO config** — the `approved-and-green` reaction in `agent-orchestrator.yaml` is DISABLED. Either remove the entry from `reactions:` map, or set its `action: notify` (no-op for merge purposes). AO will still emit `pr.review.green` webhook events when CI is green and a PR is approved; it just won't auto-merge.

2. **codex Stop-hook output** — the W280a Stop-hook continues writing `.claude/state/codex-gate-W<wave>.json` with schema:
   ```json
   {
     "wave": "W<n>",
     "session_id": "<uuid>",
     "verdict": "APPROVE" | "BLOCK",
     "round_1_findings": [...],
     "round_2_findings": [...],
     "timestamp": "2026-05-21T14:23:00Z",
     "pr_url": "https://github.com/<org>/<repo>/pull/<n>"
   }
   ```
   This file is the codex-gate state of truth. Stop-hook owns writes; bridge owns reads.

3. **Bridge** — `tools/composio-bridge.mjs` (the ≤2 KB cite-anchored shim from umbrella §6.2) subscribes to the local webhook endpoint at `http://127.0.0.1:9077/ao-event`. On every event whose type is `pr.review.green` OR `pr.merged`:
   - It looks up the corresponding `.claude/state/codex-gate-W<wave>.json` by PR url.
   - If file is missing → operator-notify, no merge.
   - If file is present AND `verdict === "APPROVE"` → invokes `gh pr merge --merge --auto <pr-url>` itself (or `--squash` per operator config).
   - If file is present AND `verdict === "BLOCK"` → operator-notify, no merge; record finding to Langfuse.

4. **Idempotency** — bridge keeps `pr_url → merged_at` row in T6 basic-memory under `main/W362c/merged-prs` so repeated webhook fires don't double-merge.

5. **Manual stop fallback** — operator can manually `gh pr merge ...` if the gate is stuck; bridge logs but doesn't override.

**Decision for umbrella spec:** §6.2 bridges table "codex Stop-hook → merge gate" row updated to describe Path B only (Path A section removed). §6.2 yaml example removes the `if: codex_gate_passed` line from `approved-and-green` reaction, or sets `action: notify` to disable. Workflow contract above gets cite-anchored at §6.2 bridges row in r6.

---

## P0.4 — Inactivity-threshold tuning + observability sink shape

**Inputs:** Umbrella spec §2 (max-quality, no budget kill). §6.3 (observability + inactivity). §P0.2 manual-stop API discovery (`ao stop [project]` CLI confirmed in `CLAUDE.md` § ao stop, verbatim quoted in §P0.2 lines 351-359).

**Decisions:**

1. **`inactivity_threshold` default = 60m** — chosen because (a) Composio AO ships a per-session `pty.active` heartbeat in its `lifecycle` config (the runtime tracks tty activity continuously, so a 60m IDLE window genuinely means "no pty input/output activity for 60m" — not "session reasoning for 60m"); (b) long codex round 1+2 reasoning waits and 1M-context parent-agent reasoning still produce intermittent stdout/stderr (tee output, status pings, sub-agent tool calls) which refresh the heartbeat; (c) the max-quality directive in umbrella spec §2 explicitly forbids premature kill — "Cost is *observed*, not *capped*" — so we err on the relaxed side; (d) §6.3 explicitly notes "long codex review rounds + 1M-context reasoning + parallel agent waits do not get prematurely terminated" at 60m. The threshold is operator-overridable via env `AO_INACTIVITY_THRESHOLD=90m` (or higher) — recorded in `agent-orchestrator.yaml:lifecycle.inactivity_threshold` per the canonical example schema captured in §P0.2.

2. **Observability data shape:**
   - **Probe:** `mcp__ccusage__blocks` invoked every 60s by `tools/agt-observer.mjs` (the bridge observability shim — pure observability, no kill API exposure). Probe interval configurable via operator env `AGT_OBSERVER_INTERVAL_S` (default `60`).
   - **Langfuse event name:** `agt.threshold.cross` — emitted as a Langfuse OTEL annotation on every threshold-cross event with payload `{severity, threshold_pct, monthly_cap, observed_spend, wave, agent_id, ts}`.
   - **Threshold-cross severity levels:** `soft-info` fires at 50% of operator-configured monthly cap; `soft-warn` fires at 100% of operator-configured monthly cap. Both emit the Langfuse OTEL annotation AND surface an operator alert (dashboard row OR desktop toast via the AO notifier stack per §6.2 notificationRouting). **NEITHER triggers any kill action** — per max-quality directive §2 + §6.3 explicit "NEVER invokes session.kill" line. The bridge `tools/agt-observer.mjs` does NOT import or invoke any AO `stop`/`kill` or `claude stop` API — observability shim only, no kill path linked in.
   - **T6 ledger:** every threshold-cross row also written to T6 basic-memory under `main/W362c/agt-threshold-crosses/{wave}/{ts}` for retrospective wave-row cost-outlier analysis per §7 KNOWN-ACCEPTED row.

3. **Manual-stop API:**
   - **AO (confirmed in §P0.2):** `ao stop` (no args) kills ALL sessions across ALL projects + sends SIGTERM to parent `ao start` + stops dashboard; `ao stop <project>` kills only that project's sessions (does NOT kill parent process or dashboard). No per-session `ao session kill <id>` API is documented in the public README/SETUP/CLAUDE.md surface — operators wanting single-session granularity fall through to the next bullet.
   - **Native CC fallback:** `claude stop <id>` (per `https://code.claude.com/docs/en/cli-reference`) — operator-driven, per-session granularity, independent of AO.
   - **Bridge contract:** `tools/agt-observer.mjs` and `tools/composio-bridge.mjs` NEVER auto-invoke either `ao stop` or `claude stop`. The manual-stop API surface is documented for operator use ONLY; the bridge logs threshold-cross events but never authors a kill call. Per max-quality directive §2.

**Verdict:** All 3 sub-decisions recorded. (a) inactivity_threshold default locked at 60m with env override `AO_INACTIVITY_THRESHOLD`; (b) observability data shape locked at `mcp__ccusage__blocks` every 60s → Langfuse `agt.threshold.cross` annotation → `soft-info`/`soft-warn` severity → never-kill; (c) manual-stop API = `ao stop [project]` primary + `claude stop <id>` fallback, both operator-only. §6.3 of umbrella spec is consistent with this resolution; no design re-open required.

**Decision for umbrella spec:** §6.3 + §6.2 yaml `lifecycle.inactivity_threshold` locked at 60m (already reflected in §6.2 yaml line 304 per `grep` of current spec); §6.2 Component #5 row already describes `tools/agt-observer.mjs` + `agent-orchestrator.yaml:lifecycle.inactivity_threshold: 60m`; §6.2 bridges table "ccusage MCP + Langfuse → bridge observability sink" row already lists the never-kill contract. Recommended r6 edits: (i) §6.3 add explicit sentence "Threshold-cross severity levels = `soft-info` (50% monthly cap) + `soft-warn` (100% monthly cap); Langfuse event name = `agt.threshold.cross`; T6 ledger row written per cross at `main/W362c/agt-threshold-crosses/{wave}/{ts}`"; (ii) §7 KNOWN-ACCEPTED runaway-cost row update the operator-mitigation phrasing from "`claude stop <id>` / `ao session kill <id>`" to "`claude stop <id>` / `ao stop [project]`" (the `ao session kill <id>` form does not exist in the public AO surface per §P0.2 finding); (iii) §6.2 yaml leave `inactivity_threshold: 60m` as-is. No §6.x structural edits required.

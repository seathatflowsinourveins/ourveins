# STREAM A — Same-Project Session-Concurrency Mechanics

> Research deliverable for the parallel-session workflow architecture. Produced by the `psr-mechanics` sota-researcher agent (2026-05-16) under the `sota-convergence-audit` 5-phase pipeline; persisted by the orchestrator (the sota-researcher role is read-only by design — `tools:` omits Write/Edit). One of four research streams under `docs/architecture/parallel-sessions/`.

## §0 Scope

Stream A covers the **mechanics** of running >1 Claude Code session against one repo simultaneously without collision. Out of scope (other streams): orchestration tool benchmark (B), cross-project/multi-account isolation (C), memory layers + git add-ons (D).

**Headline finding:** Every mechanism here is **native to Claude Code** — zero plugin install, zero self-invented hook, zero vendor SDK. The entire same-project-concurrency surface ships in the CLI and is configured via `settings.json`. Maximum cardinal-rule compliance.

## §1 The Four Mechanisms (+ one planned)

Claude Code's comparison page (`https://code.claude.com/docs/en/agents`) frames them by *who coordinates* and *whether workers talk*:

| Mechanism | What it gives you | Coordinator |
|---|---|---|
| **Subagents** | Delegated workers in one session; return a summary | The session's main agent |
| **Agent view** (background sessions) | One screen to dispatch + monitor sessions running in the background | You |
| **Agent teams** | Multiple coordinated sessions, shared task list, mailbox | A lead session |
| **Worktrees** | Separate git checkouts so parallel sessions never touch each other's files | (isolation layer) |
| **`/batch`** *(planned)* | Splits one change into 5–30 worktree-isolated subagents, each opens a PR | — |

**Critical mental model:** worktrees are the *file-isolation layer*; subagents / agent teams / agent view are *work-distribution layers*. You compose them. Per the `worktrees` doc: "They isolate file edits, while subagents and agent teams coordinate the work itself."

### 1.1 git worktrees — the parallel-session file-isolation primitive

**What:** "A git worktree is a separate working directory with its own files and branch, sharing the same repository history and remote... edits in one session never touch files in another." (`https://code.claude.com/docs/en/worktrees`)

**`--worktree`/`-w` flag** — primary entrypoint:
```bash
claude --worktree feature-auth   # creates .claude/worktrees/feature-auth/ on branch worktree-feature-auth
claude --worktree bugfix-123     # 2nd terminal, different name = 2nd isolated session
claude --worktree                # omit name -> auto-generated (e.g. bright-running-fox)
claude --worktree "#1234"        # branch from PR -> fetches pull/1234/head, worktree at pr-1234
```
Cite: `worktrees` §"Start Claude in a worktree" + §"Choose the base branch"; `cli-reference`.

**`EnterWorktree` tool** — in-session: "ask Claude to 'work in a worktree' during a session, and it will create one with the `EnterWorktree` tool." Schema (`agent-sdk/typescript`): `name`/`path` mutually exclusive; `path` switches into an existing worktree.

**Subagent isolation — `isolation: worktree` frontmatter:** "Each subagent gets a temporary worktree that is removed automatically when the subagent finishes without changes." Cite: `worktrees` §"Isolate subagents with worktrees"; `sub-agents` §"Supported frontmatter fields".

**`worktree.baseRef` setting** — `"fresh"` (default; branches from `origin/<default>`) or `"head"` (branches from local `HEAD`, carries unpushed commits — "useful when isolating subagents that need to operate on in-progress work"). Accepts only those two values. Cite: `worktrees` §"Choose the base branch"; `settings`.

**`.worktreeinclude`** — copies gitignored files (`.env` etc.) into new worktrees; `.gitignore` syntax; only gitignored matches copied.

**Large-repo perf:** `worktree.symlinkDirectories` (symlink shared dirs like `node_modules`) and `worktree.sparsePaths` (git sparse-checkout for monorepos). Cite: `settings`.

**Lifecycle/cleanup:** clean exit (no changes) → worktree+branch auto-removed; changes exist → Claude prompts; `--worktree`+`-p` non-interactive → NOT auto-cleaned (`git worktree remove`); orphaned **subagent** worktrees swept at startup past `cleanupPeriodDays`, but `--worktree` ones never swept.

**Manual:** `git worktree add ../path -b branch` / `add ../path existing-branch` / `list` / `remove`.

**Gotchas:** `.gitignore` must contain `.claude/worktrees/`; first `--worktree` use needs the workspace-trust dialog accepted (`claude` once in dir first — "including when combined with `-p`"); subagent `cd` doesn't persist between tool calls, so `isolation: worktree` is the only way to give a subagent a separate checkout.

**Windows specifics:** `git worktree` is plain git, no Bash dependency (CC week 18: "Claude Code on Windows runs without Git Bash"). **The one Windows-fragile knob:** `worktree.symlinkDirectories` needs OS symlink privilege (Developer Mode or elevation) — treat as opt-in; fallback is `worktree.sparsePaths` (pure git). Path lengths: Z: root is short, low `MAX_PATH` risk.

**Verdict: ADOPT — primary primitive.** Already partially live: the research session ran inside `.claude/worktrees/agent-a4d20ed4c0496b909` (confirmed via `git worktree list`).

### 1.2 Agent teams — lead + mailbox coordination

**What:** "One session acts as the team lead... Teammates work independently, each in its own context window, and communicate directly with each other." Status: experimental, disabled by default, requires CC v2.1.32+. Cite: `agent-teams`.

**Enable:** `{"env":{"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS":"1"}}`.

**Architecture (4 components):** Team lead / Teammates / shared Task list / Mailbox. State at `~/.claude/teams/{name}/config.json` + `~/.claude/tasks/{name}/` (auto-generated — never hand-edit; "no project-level equivalent").

**Coordination:** shared task list (pending/in-progress/completed, with dependencies; "task claiming uses file locking to prevent race conditions"); mailbox ("delivered automatically... lead doesn't need to poll"; one message per recipient to reach everyone); idle notifications.

**Context inheritance:** each teammate "loads the same project context as a regular session: CLAUDE.md, MCP servers, and skills... **The lead's conversation history does not carry over.**"

**File-ownership gap (CRITICAL):** agent teams do **NOT** isolate teammates in worktrees. "Two teammates editing the same file leads to overwrites. Break the work so each teammate owns a different set of files."

**Display modes:** `in-process` (any terminal, `Shift+Down` to cycle) or `split panes` (needs tmux/iTerm2). **Windows-critical:** split panes "isn't supported in VS Code's integrated terminal, **Windows Terminal**, or Ghostty" — on Windows, agent teams **must** run `in-process`.

**Limitations:** no resume with in-process teammates; task status can lag; one team per lead; no nested teams; lead is fixed; permissions set at spawn. Token cost scales linearly — recommended size **3–5 teammates**.

**Verdict: ADOPT — coordinated multi-agent builds, in-process mode only.** Already enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` confirmed). Not for unattended `/loop` (experimental, no resume) — use operator-attended. Combine with worktrees for the file-conflict gap.

### 1.3 Background sessions + agent view — hand-off and monitor

**What:** "Agent view, opened with `claude agents`, is one screen for all your background sessions... Each background session is a full Claude Code conversation that keeps running without a terminal attached." Status: research preview, CC v2.1.139+. Cite: `agent-view`.

**Three entrypoints:** `claude --bg "<prompt>"` (shell; `--name` to label; `--agent X --bg` to run a subagent); `/background`/`/bg` (from inside a session — "starts a fresh process that resumes from the saved conversation"); typing in the `claude agents` input.

**Shell commands:** `claude agents` (`--cwd` scopes to one project), `claude attach <id>`, `claude logs <id>`, `claude stop <id>`, `claude respawn <id>`/`--all`, `claude rm <id>`.

**File isolation is AUTOMATIC:** "**Before editing files, Claude moves the session into an isolated git worktree under `.claude/worktrees/`**, so parallel sessions can read the same checkout but each writes to its own." (Skipped only outside a git repo, or already under `.claude/worktrees/`.) — This is the key collision guarantee for background sessions.

**Supervisor process:** per-user, separate from the terminal; "you can close agent view, close your shell... and your dispatched work keeps going." With `CLAUDE_CONFIG_DIR` set (this runtime: `Z:/claude-sota-installed/.claude`), "the supervisor uses that directory instead of `~/.claude` and runs as a separate instance" — correctly scoped to this install.

**Sleep caveat:** "Background sessions run on your machine and stop if it sleeps or shuts down" → `claude respawn --all` after waking.

**`/loop` integration:** agent view shows `/loop` sessions with a run count + countdown row — natural monitor for this runtime's autonomous work.

**`claude agents` vs `/agents` vs `/tasks`:** agent view (background, all projects) / in-session subagent panel / current-session background items — three distinct monitors.

**Windows:** full-terminal TUI, no tmux dependency, Windows Terminal/PowerShell-clean. No blocker found.

**Verdict: ADOPT — off-critical-path background work.** Native, no tmux, Windows-clean, automatic worktree isolation. Ideal for codex-review dispatch / nightly eval / flaky-test hunts off the interactive session. Rate-limit caveat ("ten agents = ~10× quota") mitigated by this runtime's multiple MAX accounts.

### 1.4 Forked vs fresh subagents — context inheritance

**Fresh (named) subagents** — default: own context window, custom system prompt, "Fresh context with the prompt you pass."

**Forked subagents** — `CLAUDE_CODE_FORK_SUBAGENT=1` (experimental, CC v2.1.117+): "A fork is a subagent that inherits the entire conversation so far instead of starting fresh... sees the same system prompt, tools, model, and message history as the main session. The fork's own tool calls still stay out of your conversation and only its final result comes back."

**Comparison (verbatim from `sub-agents`):**

| | Fork | Named subagent |
|---|---|---|
| Context | Full conversation history | Fresh context + your prompt |
| System prompt & tools | Same as main session | From definition file |
| Model | Same as main session | From `model` field |
| Permissions | Prompts surface in your terminal | Auto-denied in background |
| Prompt cache | Shared with main session | Separate |

**Fork mode changes 3 things:** (1) Claude forks instead of using general-purpose subagent (named ones like Explore unchanged); (2) **every** subagent spawn runs in the background; (3) `/fork` spawns a fork (not a `/branch` alias).

**Cost:** fork "reuses the parent's prompt cache... cheaper than spawning a fresh subagent for tasks that need the same context."

**Forks + worktrees compose:** a fork can take `isolation: "worktree"`.

**Limitation:** "A fork cannot spawn further forks"; "Subagents cannot spawn other subagents."

**Model resolution precedence:** (1) `CLAUDE_CODE_SUBAGENT_MODEL` env → (2) per-invocation param → (3) `model` frontmatter → (4) main conversation's model. **Implication:** leave `CLAUDE_CODE_SUBAGENT_MODEL` UNSET (as this runtime does) so forks inherit the main model via step 4 — setting it funnels all subagents to one model and defeats fork inheritance.

**Verdict: ADOPT — already correctly enabled.** `CLAUDE_CODE_FORK_SUBAGENT=1` confirmed. Forks = "try N approaches from the same starting point"; fresh subagents = clean-context review/verification.

## §2 Collision-Prevention Discipline

Three collision modes: (a) two writers, same file; (b) two writers, same branch; (c) ad-hoc integration drops work.

**File ownership:**
- **F1** — One worktree per concurrent writer (`--worktree` interactive; automatic for background; `isolation: worktree` for subagents).
- **F2** — Scope worktrees by **MODULE, not task**: same-module tasks share a worktree (sequential); cross-module tasks go to parallel worktrees. Strong 3-source convergence.
- **F3** — Agent teams: partition files explicitly in each teammate's spawn prompt (they don't auto-isolate); optionally add per-teammate worktrees.
- **F4** — Outside a git repo there is NO isolation (non-issue here — this is a git repo).

**Branch ownership:**
- **B1** — One branch per worktree (git enforces this).
- **B2** — Choose `baseRef` deliberately: `"fresh"` for independent features, `"head"` for in-progress work.
- **B3** — PR-linked branches (`--worktree "#1234"`) for hand-off; agent view shows PR status dots.

**Integration/merge:**
- **I1** — **Rebase, don't merge**, between worktrees ("merge commits pollute history and confuse Claude when it reads `git log`"). 3-source convergence.
- **I2** — Commit/push **before** deleting a worktree/session (deletion discards uncommitted changes).
- **I3** — Audit with `git worktree list`; remove a worktree the moment its branch merges.
- **I4** — Require plan approval for risky parallel agent-team work (read-only plan mode until lead approves).
- **I5** — Cap concurrency at the review-throughput limit: practitioners converge on **2–5 parallel** (~3 default); the binding constraint is *your* review capacity, not the tool.

## §3 Decision Matrix

| Scenario | Mechanism | Why |
|---|---|---|
| **Quick parallel edit** (2 small unrelated changes, you drive both) | Two `claude --worktree` sessions, 2 terminals | Filesystem isolation, zero coordination |
| **Long parallel feature** (2 independent features, hours/days) | One `claude --worktree <module>` per feature | Persistent named worktrees survive sittings; `--continue`/`--resume` |
| **Off-critical-path background work** (codex-review, nightly eval, flaky-test) | `claude --bg "<task>"` + `claude agents` to monitor | Supervisor runs it terminal-free; automatic worktree isolation |
| **Coordinated multi-agent build** (feature spanning FE+BE+tests) | Agent team, `teammateMode: in-process`, files partitioned per teammate | Shared task list + mailbox; in-process is the only Windows-safe mode |
| **Side task needing full current context** ("draft tests for changes so far") | Forked subagent (`/fork <directive>`) | Inherits conversation — no re-explaining; cheaper (shared cache) |
| **Side task that must NOT see/pollute main context** (independent review, log processing) | Fresh/named subagent (`@code-reviewer`) | Input isolation; fresh context improves review objectivity |
| **Parallel research/exploration** (auth+DB+API at once) | Multiple subagents in parallel (or research agent-team if findings must be debated) | Each explores independently; Claude synthesizes |
| **Subagent editing overlapping files** | Subagent with `isolation: worktree` frontmatter | Own checkout; auto-cleaned if no changes |
| **Repo-wide migration / mechanical refactor** | `/batch` (planned — 5–30 worktree-isolated subagents, each a PR) | Purpose-built for fan-out; not yet GA — WATCHLIST |
| **Monitor everything** | `claude agents` (background) / `/agents` Running tab (in-session subagents) / `/tasks` (current-session background) | Three distinct monitors |

**Heuristics:** *Who drives?* You → worktrees; Claude-in-one-session → subagents/forks; Claude-coordinates-group → agent team. *Workers talk?* No → subagents/background; Yes → agent team. *Writers overlap files?* Yes → worktrees always. *Need current context?* Yes → fork; No → fresh subagent. *Survive closing terminal?* Yes → background session.

## §4 Convergence Table (practice → ≥3 organizationally-distinct sources)

| Practice | Verdict | Sources |
|---|---|---|
| git worktrees = parallel-session isolation primitive | **ADOPT** | Anthropic docs + Dan Does Code + MindStudio + Code With Seb |
| `.claude/worktrees/` in `.gitignore` | **ADOPT** (already done) | Anthropic docs + The Prompt Shelf + Medium/Tuna |
| Scope worktrees by module, not task | **ADOPT** | Code With Seb + MindStudio + Dan Does Code |
| Rebase (not merge) between worktrees | **ADOPT** | Code With Seb + Dan Does Code + The Prompt Shelf |
| Cap parallel sessions ~2–5 | **ADOPT** (~3) | Anthropic docs (3–5) + Code With Seb (2–4) + MindStudio |
| Remove worktree on merge; `git worktree list` audit | **ADOPT** | Anthropic docs + MindStudio + The Prompt Shelf |
| Tight specific task scope per session | **ADOPT** | Anthropic docs + Dan Does Code + jangwook.net |
| Background sessions: automatic worktree isolation | **ADOPT** (primary-source verified) | Anthropic `agent-view` doc |
| Agent teams need explicit file-partition | **ADOPT** (primary-source) | Anthropic `agent-teams` + `agents` |
| Windows → agent-teams in-process (not split panes) | **ADOPT** (Windows-specific) | Anthropic `agent-teams` §Limitations |
| `worktree.symlinkDirectories` for large dirs | **WATCHLIST** | Anthropic `settings` only — Windows symlink-privilege caveat |

**Retractions / non-findings (R3 honesty):** Background sessions do **NOT** survive OS sleep/shutdown — any "fire-and-forget multi-day" claim is rejected. `/batch` is documented only as planned — WATCHLIST not ADOPT. `worktree.symlinkDirectories` Windows behavior could not be measured this pass — symlink-privilege caveat inferred from standard Windows semantics; flag for operator test before any wiring relies on it.

## §5 Concrete Wiring for THIS Runtime

**Verified current state (probed 2026-05-16):** `.gitignore` has `.claude/worktrees/`; `CLAUDE_CODE_FORK_SUBAGENT=1`; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; `worktree` key + `teammateMode` **unset**; `cleanupPeriodDays: 60`; `git worktree list` shows active `agent-*` subagent worktrees. **The surface is mostly already wired.** Three small reversible additions remain — all `settings.json`, cardinal-rule-compliant:

**Action 1 (HIGH) — Add `worktree` block to `.claude/settings.json`:**
```json
{ "worktree": { "baseRef": "head" } }
```
`"head"` branches new worktrees from local `HEAD` so worktree-isolated subagents see unpushed `/loop` work-in-progress (default `"fresh"` would start from remote and miss it). **Do NOT add `symlinkDirectories`** — Windows symlink-privilege risk; use `sparsePaths` if disk duplication becomes a problem. Reversible <1 min.

**Action 2 (HIGH, Windows-critical) — Pin `teammateMode` in `.claude/settings.json`:**
```json
{ "teammateMode": "in-process" }
```
Forces agent teams into the always-works mode, skips the pointless tmux probe (`"auto"` default), documents the Windows constraint. Cite: `agent-teams` §"Choose a display mode" + §Limitations.

**Action 3 (verify-only) — Keep `CLAUDE_CODE_SUBAGENT_MODEL` UNSET; keep fork+teams env vars as-is.** Setting `CLAUDE_CODE_SUBAGENT_MODEL` is step 1 of model resolution and funnels all subagents to one model, defeating fork inheritance — the runtime's existing DEPRECATED stance is correct.

**Worktree directory layout — use the default `.claude/worktrees/<name>/`, do not relocate:** already gitignored; background sessions + `isolation: worktree` subagents auto-use it; Z: root is short (no `MAX_PATH` risk). Manual parallel-feature worktrees: name `<module>-<short-desc>` (module-first encodes Rule F2).

**Plugins:** **No new plugin install required** — all §1 mechanisms are native CLI features configured via `settings.json`. Installed `superpowers` skills (`using-git-worktrees`, `dispatching-parallel-agents`) reinforce §2 discipline behaviorally but don't replace the native mechanisms.

## Summary

Claude Code ships four native parallel-work mechanisms — **worktrees** (the file-isolation layer) plus **subagents**, **forked subagents**, **background sessions/agent view**, and **agent teams** (the work-distribution layers). Worktrees are the load-bearing primitive: every concurrent *writer* gets its own `.claude/worktrees/<name>/` checkout on its own branch, so "edits in one session never touch files in another." Background sessions (`claude --bg`) move into a worktree *automatically* before editing. Agent teams do **not** auto-isolate, so partition files explicitly per teammate. Discipline: scope worktrees by **module not task**; **rebase don't merge** between worktrees; commit before deleting any worktree; cap at ~3 parallel writers. Decision rule: you-drive→worktrees; delegate-in-session→subagents/forks; Claude-coordinates-a-group→agent team. **Everything is native — no plugin, hook, or SDK needed.**

**Top 3 wiring actions** (all `settings.json`, reversible <1 min):
1. Add `"worktree": {"baseRef": "head"}` — worktree-isolated subagents then see unpushed `/loop` work-in-progress.
2. Add `"teammateMode": "in-process"` — Windows-critical: split panes are unsupported in Windows Terminal.
3. Keep `CLAUDE_CODE_SUBAGENT_MODEL` unset — setting it defeats fork model-inheritance.

### Sources
- https://code.claude.com/docs/en/worktrees
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/agent-teams
- https://code.claude.com/docs/en/agent-view
- https://code.claude.com/docs/en/agents
- https://code.claude.com/docs/en/common-workflows
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/env-vars
- Code With Seb — Parallel Claude Code Sessions with Git Worktrees
- MindStudio — How to Use Git Worktrees with Claude Code
- Dan Does Code — Parallel Vibe Coding with Git Worktrees
- The Prompt Shelf — Claude Code Git Worktree Guide

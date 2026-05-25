# W301 — Operator Actions: anthropics/claude-code Feature Gaps (RUNTIME SELF-AUDIT)

**Wave**: W301
**Date**: 2026-05-18
**Source**: `W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md §1.4` — 13 documented `anthropics/claude-code` features under-used by current `claude-sota-installed` runtime.
**Status**: deferred catch-up file (per W301 §C row #22).

The "adoption verdict" for `anthropics/claude-code` is N/A (it IS the runtime). The audit deliverable is this **gap-closure list**: 13 documented features the runtime is NOT exercising.

---

## §1 — The 13 gap rows

Cites are all from `https://code.claude.com/docs/en/*` (canonical Anthropic Claude Code docs, fetched 2026-05-18 W301.G via `ctx_fetch_and_index`).

| # | feature | what-it-does | why-not-used | blocking? | proposed-pilot |
|---|---------|--------------|--------------|-----------|----------------|
| 1 | **`PostToolUseFailure` hook** | Fires when a tool call errors; receives `error: str` so the model can re-plan from the failure. Cite: `cc-hooks-canon` event-table. | settings.json has `PreToolUse|PostToolUse|PreCompact|SessionStart|WorktreeRemove|Notification` only; failure path silent. | non-blocking (model still sees stdout errors) | wire one settings.json hook firing `gitleaks --no-banner` only on tool failure → exercises the path safely. |
| 2 | **`isolation: "worktree"` subagent flag** | Per-subagent file-isolation: subagent runs in a git-worktree rather than the parent CWD. Cite: `cc-hooks-canon::WorktreeCreate` ("when a subagent uses `isolation: "worktree"`"). | wshobson wrapper agents installed but flag never set in `.claude/agents/<n>.md`. | non-blocking; ENABLES W269 parallel-safety mandate. | toggle on the next parallel-team spawn; verify via `git worktree list` after spawn. |
| 3 | **`/effort` slash command** | Sets model effort level (Opus reasoning depth). Cite: CHANGELOG 2.1.105+ + `cc-commands-canon`. | operator never tunes — defaults to model auto. | non-blocking | manual operator-toggle for a Wave's worth of work; observe quality delta + cost. |
| 4 | **`Monitor` tool** | Stream-events from a background process (each stdout line is a notification). Cite: prompt header ("use Monitor tool to stream events from a background process; one-shot wait until done → Bash with run_in_background"). | not invoked in any W295-W301 transcript; operator uses Bash `run_in_background` only. | non-blocking | use for `npm test --watch` or codex-rescue wait-until-done. |
| 5 | **`/context all` per-skill estimates** | Shows token cost per loaded skill, accounts for tokenizer. Cite: CHANGELOG 2.1.139 + `cc-commands-canon`. | runtime has 18 + 62 loaded skills (W288 audit) but per-skill cost never inspected. | non-blocking | run `/context all` once per Wave's session; flag any skill >10k tokens for prune review. |
| 6 | **`/team-onboarding` command** | Walk the lead through agent-teams primitives (per CHANGELOG 2.1.107+ floor). Cite: `cc-commands-canon`. | operator manually configures `/team-spawn`; never used the bundled onboarding. | non-blocking | run once interactively to validate the official primitives match `agent-teams:team-spawn` skill. |
| 7 | **`/powerup`** | "Interactive lessons teaching Claude Code features with animated demos." Cite: CHANGELOG 2.1.90+. | never invoked; operator self-trained via skills. | non-blocking | one-time run; treat as documentation/audit pass. |
| 8 | **`plan_approval_request` lifecycle** | Teammate spawned with `requirePlanApproval` runs in read-only plan-mode until lead approves the plan via `ExitPlanMode`. Cite: `cc-agent-teams-canon` §"Require plan approval". | W286-W301 team-spawns set `requirePlanApproval` ≠ true; no approval gate. | non-blocking; HIGH-VALUE for risky migrations | use on the W302 NSSM-migration team (Stream G P0 fixes) — lead approves wrapper-script PR before teammate writes file. |
| 9 | **`TeammateIdle` / `TaskCompleted` hooks** | Fire on team-lifecycle: teammate goes idle / task closes. Cite: `cc-hooks-canon` event-table + `cc-agent-teams-canon` §"Enforce quality gates with hooks". | settings.json has NO `TeammateIdle` or `TaskCompleted` entries. | non-blocking; HIGH-VALUE for verification-before-completion | wire `TaskCompleted` → `pytest -q` or `ruff check .` as the quality-gate. |
| 10 | **`requirePlanApproval` setting** | Enforces plan-approval mode on team spawn. Cite: `cc-agent-teams-canon`. | not in any team config. | non-blocking | pair with #8 pilot. |
| 11 | **`Setup` hook (`--init-only` / `--init` / `--maintenance`)** | One-time install/maintenance pass (vs SessionStart which runs every launch). Cite: `cc-hooks-canon` §Setup. | runtime uses `tools/bootstrap-runtime.ps1` for the same purpose. | non-blocking | optional: migrate `bootstrap-runtime.ps1` to a Setup hook for cardinal-rule-2 alignment. |
| 12 | **`background monitors` plugin manifest** | Top-level `monitors` key in plugin manifest; auto-arms at session start or on skill invoke. Cite: CHANGELOG 2.1.105. | no installed plugin uses `monitors:` key. | non-blocking; PATTERN-STUDY value | document as W302 pattern-extract for future codex stop-gate refactor. |
| 13 | **`claude --bg` + `claude agents`** | Background sessions: detach, run, reattach, stop. Cite: `cc-agent-view`. | W259-v8 U4 documents the 4 parallel modes but `--bg` not exercised in any W288+ transcript. | non-blocking | use for the codex-rescue dispatch in W302 (off-the-critical-path adversarial review). |

**Hard-cap on this list**: 13 rows is what Stream C §1.4 produced. Two additional CHANGELOG entries (Elicitation/ElicitationResult + CwdChanged/FileChanged + PermissionDenied) belong to the longer 8-hook-type ledger and are tracked under row 1 (PostToolUseFailure) as the family.

---

## §2 — Prioritization: adoption-value × ease-of-pilot

Scoring 1-5 each, product as rank-key. Higher = pilot sooner.

| # | feature | value | ease | product | rank |
|---|---------|------:|-----:|--------:|-----:|
| 1 | PostToolUseFailure hook | 5 | 5 | **25** | **#1** |
| 2 | isolation:worktree | 5 | 4 | **20** | **#2** |
| 9 | TeammateIdle / TaskCompleted | 5 | 4 | **20** | **#2 tie** |
| 5 | `/context all` estimates | 4 | 5 | **20** | **#2 tie** |
| 8 | plan_approval_request | 4 | 4 | 16 | #5 |
| 10 | requirePlanApproval setting | 4 | 4 | 16 | #5 tie |
| 3 | `/effort` | 3 | 5 | 15 | #7 |
| 13 | `claude --bg` | 4 | 3 | 12 | #8 |
| 4 | Monitor tool | 3 | 4 | 12 | #8 tie |
| 6 | `/team-onboarding` | 2 | 5 | 10 | #10 |
| 7 | `/powerup` | 2 | 5 | 10 | #10 tie |
| 12 | background monitors manifest | 4 | 2 | 8 | #12 |
| 11 | Setup hook migration | 2 | 3 | 6 | #13 |

**Top 3** (by product score): **PostToolUseFailure (#1, score 25)**, **isolation:worktree (#2, score 20)**, **TeammateIdle/TaskCompleted (#2 tie, score 20)**. Pilot these in W302.

(`/context all` ties at 20 but is operator-instinct command, not a code-change; folded into W302 routine, not a "pilot.")

---

## §3 — Pilot recipes for the top 3

### Pilot 3.1 — `PostToolUseFailure` hook (rank #1)

**Goal**: feed tool-call failures back to the model so it can self-correct instead of stalling.

**Runbook** (cardinal-rule-2 compliant: direct-CLI invocation, no `.py` self-invent):

1. Take settings.json snapshot: `Copy-Item .claude/settings.json .claude/settings.json.pre-w302-bak`
2. Add to `.claude/settings.json` `hooks` block (cite: `cc-hooks-canon` event-table + `code.claude.com/docs/en/hooks` :exit-code-2):
   ```json
   "PostToolUseFailure": [
     {
       "matcher": "Bash",
       "hooks": [
         {
           "type": "command",
           "command": "powershell -NoProfile -Command \"$ev = $input | ConvertFrom-Json; if ($ev.error -match 'permission denied|EACCES|gitleaks') { Write-Output ('hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200))) } else { exit 0 }\"",
           "timeout": 3
         }
       ]
     }
   ]
   ```
3. Smoke-test: `claude --print "run \`Get-Content nonexistent-file.txt\` and explain the error"`. Expect: model receives the hook-feedback line + plans recovery.
4. **Rollback**: `Copy-Item .claude/settings.json.pre-w302-bak .claude/settings.json -Force`

**Acceptance**: model self-corrects in a single turn rather than escalating to operator.

### Pilot 3.2 — `isolation: "worktree"` subagent flag (rank #2)

**Goal**: align W269 parallel-safety mandate (one git worktree per concurrent session) with the per-agent isolation flag, eliminating cross-stream file collisions.

**Runbook**:

1. Pick one wshobson wrapper agent, e.g. `.claude/agents/code-reviewer.md` (or whichever wrapper supports the YAML frontmatter set, per `cc-subagents` doc — note: **plugin-installed agents DO NOT support hooks/mcpServers/permissionMode**, but `isolation` IS supported per `cc-hooks-canon::WorktreeCreate`).
2. Add `isolation: worktree` to the agent's YAML frontmatter:
   ```yaml
   ---
   name: code-reviewer
   description: Reviews code for quality and best practices
   tools: Read, Glob, Grep
   model: sonnet
   isolation: worktree
   ---
   ```
3. Spawn via `Agent` tool with `subagent_type: code-reviewer`. Observe: a new git worktree appears in `git worktree list`.
4. Smoke-test: have the reviewer write to a tracked file; verify parent CWD shows zero diff (the write went to the worktree).
5. Verify WorktreeRemove fires on subagent stop (settings.json already has the prune hook per W288).
6. **Rollback**: remove the `isolation:` line; restart session.

**Acceptance**: `git worktree list` shows N+1 entries during the subagent's lifespan; parent worktree is untouched.

### Pilot 3.3 — `TeammateIdle` + `TaskCompleted` quality-gate hooks (rank #2 tie)

**Goal**: enforce verification-before-completion (a CLAUDE.md superpower mandate) at the protocol layer, not the model layer.

**Runbook**:

1. Take settings.json snapshot.
2. Add to `.claude/settings.json` `hooks` block (cite: `cc-hooks-canon` §TaskCompleted):
   ```json
   "TaskCompleted": [
     {
       "hooks": [
         {
           "type": "command",
           "command": "ruff check . 2>&1",
           "timeout": 30
         }
       ]
     }
   ]
   ```
3. Smoke-test: spawn an agent-team teammate, have it call `TaskUpdate` to mark a task complete. If `ruff` fails, the hook returns exit-2 and the task stays open (per `cc-hooks-canon`: "When a TaskCompleted hook exits with code 2, the task is not marked as completed and the stderr message is fed back to the model as feedback").
4. **Optional** TeammateIdle counterpart (per `cc-hooks-canon`: "When an agent team teammate is about to go idle"): wire to `pytest -q --tb=no` for fast feedback on the whole team's state.
5. **Rollback**: remove the hook block.

**Acceptance**: `ruff check` failures block task closure; lead receives the stderr as feedback.

---

## §4 — W302 decision gate

**Recommend pilots in W302**: **Top 3** above (PostToolUseFailure, isolation:worktree, TaskCompleted quality-gate). Total operator-time ≈ 35 minutes including smoke-tests and rollback validation. All three are reversible.

**Defer to W303+**:
- `plan_approval_request` + `requirePlanApproval` (combined pilot when next high-risk team is spawned; ties to W301.G NSSM migration as a natural surface).
- `/effort` + `/context all` — operator-discretion, no code change; treat as Wave-cadence habit.
- `claude --bg` — fold into codex-rescue refactor (when bg sessions become the standard for adversarial-review dispatch).
- `Setup` hook migration of `tools/bootstrap-runtime.ps1` — cardinal-rule alignment win but ≥3 hours work; not W302 priority.
- `/team-onboarding`, `/powerup`, `Monitor`, `background monitors` manifest — documentation/familiarization passes only.

**Out of scope until cardinal-rule re-ratification**: any pilot that requires a new `.claude/hooks/scripts/*.py` is **CR-2 BLOCK**. All three top-3 pilots use direct-CLI invocation (`powershell -NoProfile -Command ...`, `ruff check .`) per CR-2.

---

## Evidence trail

| cite | claim |
|------|-------|
| `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-18 ctx-fetch] event-table | full hook-event enumeration incl. PostToolUseFailure, TeammateIdle, TaskCreated/TaskCompleted, Elicitation/ElicitationResult, WorktreeCreate/Remove |
| `https://code.claude.com/docs/en/agent-teams` [VERIFIED 2026-05-18] §"Enforce quality gates with hooks" | TaskCompleted exit-code-2 contract; plan_approval_request lifecycle |
| `https://code.claude.com/docs/en/sub-agents` [VERIFIED 2026-05-18] §"Choose the subagent scope" | `isolation: "worktree"` flag |
| `https://code.claude.com/docs/en/agent-view` [VERIFIED 2026-05-18] | `claude --bg` + `claude agents` / `attach` / `logs` / `stop` commands |
| `https://code.claude.com/docs/en/commands` [VERIFIED 2026-05-18] | bundled slash commands (`/effort` /context /powerup /team-onboarding) |
| `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md` (prior ctx_search index 2026-05-12) | `/effort` 2.1.105+, `/powerup` 2.1.90+, `monitors` manifest 2.1.105+, `/context all` 2.1.139+ |
| `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md` §1.4 | source GAP table (13 rows) |
| `CLAUDE.md:23` cardinal rule 2 @ HEAD `e44ba9e` | NO `.claude/hooks/scripts/*.py` — pilots use direct-CLI only |

**END operator-actions catch-up.** Parent: append W302 dispatch row + add ledger entry "16 | W301 carry-over | PostToolUseFailure + isolation:worktree + TaskCompleted pilot."

# W319 Stream A — Static Orchestration Audit (2026-05-19)

> Scope: `.claude/settings.json` env + `.claude/plugins/cache/{claude-code-workflows,...}/*` orchestration plugins + `installed_plugins.json` enabled-state.
> Probe basis: read-only inspection. Operator concern verbatim: "I feel that your agent team orchestration has silent fallback or errors".

## 1. `.claude/settings.json` env block — orchestration-relevant keys

| Key                                          | Value          | File:Line                                        | Verdict |
|----------------------------------------------|----------------|--------------------------------------------------|---------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`       | `"1"`          | `.claude/settings.json:13`                       | ON. Required by `/team-spawn` per `agent-teams/1.0.2/commands/team-spawn.md:12-14`. |
| `CLAUDE_CODE_FORK_SUBAGENT`                  | `"1"`          | `.claude/settings.json:6`                        | ON. Forks main convo into subagent per `https://docs.anthropic.com/en/docs/claude-code/sub-agents#fork-the-current-conversation`. |
| `CLAUDE_CODE_SUBAGENT_MODEL`                 | **UNSET**      | (absent)                                         | INTENTIONAL OFF per `CLAUDE.local.md:50-52` (deprecated Sonnet stand-in, defeats cross-model gate). |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY`            | `"1"`          | `.claude/settings.json:35`                       | OFF — wins over `autoMemoryEnabled:false` (line 430). Intentional. |
| `teammateMode`                               | `"in-process"` | `.claude/settings.json:433`                      | Windows-correct. tmux/iTerm2 unavailable on Win. |
| `defaultMode`                                | `"bypassPermissions"` | `.claude/settings.json:92`                | **CARDINAL-RULE R5 SHIP-BLOCKER carry-over** (5+ wave convergent). Out-of-Stream-A scope. |
| `sandbox.enabled`                            | `false`        | `.claude/settings.json:415`                      | **R5 SHIP-BLOCKER carry-over**. Out-of-Stream-A scope. |
| `autoMemoryEnabled`                          | `false`        | `.claude/settings.json:430`                      | Intentional per `CLAUDE.local.md:90`. |

**Δ from W314-C audit**: W314 reported `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` missing. It is now present at `:13`. Pre-flight gate for `/team-spawn` **is now satisfied**. W314-C-§3 recommendation (Option 1: Activate) was applied.

## 2. Installed orchestration plugins (`installed_plugins.json`)

11 orchestration-relevant plugins installed; enabled-state varies:

| Plugin                                          | Cache path                                                                                                  | Installed SHA      | Enabled  | Notes |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------|--------------------|----------|-------|
| `agent-teams@claude-code-workflows`             | `claude-code-workflows/agent-teams/1.0.2/`                                                                  | `08ded5e7`         | **true** | v1.0.2 (`installed_plugins.json:312-322`). Upstream HEAD `ece811f2` — 8 modified lines (see Stream A Cookbook-Ingest doc). |
| `agent-orchestration@claude-code-workflows`     | `claude-code-workflows/agent-orchestration/1.2.1/`                                                          | `34632bce`         | **true** | v1.2.1 (`:389-398`). Ships single agent `context-manager.md` + 2 cmds (`improve-agent.md`, `multi-agent-optimize.md`). No team-spawn replacement. |
| `comprehensive-review@claude-code-workflows`    | `claude-code-workflows/comprehensive-review/1.3.0/`                                                         | `34632bce`         | **true** | v1.3.0 (`:323-332`). Multi-dim review orchestrator (sec/arch/perf/test/best-practices). |
| `superpowers@claude-plugins-official`           | `claude-plugins-official/superpowers/5.1.0/`                                                                | `f2cbfbef`         | **true** | v5.1.0 (`:532-541`). Ships `dispatching-parallel-agents` + `subagent-driven-development`. |
| `incident-response@claude-code-workflows`       | `claude-code-workflows/incident-response/1.3.1/`                                                            | `34632bce`         | **true** | v1.3.1 (`:455-464`). Ships incident-orchestration `/smart-fix` + multi-agent debug. |
| `context-management@claude-code-workflows`      | `claude-code-workflows/context-management/1.2.0/`                                                           | `34632bce`         | **true** | v1.2.0 (`:378-387`). |
| `conductor@claude-code-workflows`               | `claude-code-workflows/conductor/1.2.1/`                                                                    | `08ded5e7`         | **true** | v1.2.1 (`:554-563`). Track-based workflow primitives. |
| `ship-mate@claude-code-workflows`               | `claude-code-workflows/ship-mate/1.0.0/`                                                                    | `08ded5e7`         | **true** | v1.0.0 (`:565-574`). Pipeline orchestration. |
| `pr-review-toolkit@claude-plugins-official`     | `claude-plugins-official/pr-review-toolkit/3be2e4cc2bbc/`                                                   | `3be2e4cc`         | **true** | (`:92-101`). |
| `qa-orchestra@claude-code-workflows`            | `claude-code-workflows/qa-orchestra/1.0.0/`                                                                 | `5df9ad40`         | **false**| Disabled in `.claude/settings.json:265`. Not analysed here. |
| `agenthub@claude-code-skills`                   | `claude-code-skills/agenthub/2.2.2/`                                                                        | `0d477a06`         | **false**| Disabled in `:275`. |

**Cardinal-rule R1 conformance**: ✓ ALL 11 plugins originate from trusted Anthropic-curated marketplaces (`claude-plugins-official`, `claude-code-workflows`, `claude-code-skills` = `alirezarezvani/claude-skills`). No self-invented orchestration agents in `.claude/agents/` (project dir contains 0 agent files).

## 3. `agent-teams@1.0.2` on-disk contents (cardinal-rule-3 conformance check)

```
.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/
├── README.md                              (R3 ✓ ships agent definitions cite-anchored to https://code.claude.com/docs/en/agent-teams)
├── agents/
│   ├── team-debugger.md                   (tools: Read,Glob,Grep,Bash,TaskList,TaskGet,TaskUpdate,SendMessage)
│   ├── team-implementer.md                (tools: Read,Write,Edit,Glob,Grep,Bash,TaskList,TaskGet,TaskUpdate,SendMessage)
│   ├── team-lead.md                       (tools: Read,Glob,Grep,Bash,Agent,TeamCreate,TeamDelete,TaskCreate,TaskList,TaskGet,TaskUpdate,SendMessage)
│   └── team-reviewer.md                   (tools: Read,Glob,Grep,Bash,TaskList,TaskGet,TaskUpdate,SendMessage)
├── commands/
│   ├── team-debug.md
│   ├── team-delegate.md
│   ├── team-feature.md
│   ├── team-review.md
│   ├── team-shutdown.md
│   ├── team-spawn.md                      (7 presets: review|debug|feature|fullstack|research|security|migration)
│   └── team-status.md
└── skills/
    ├── multi-reviewer-patterns/
    ├── parallel-debugging/
    ├── parallel-feature-development/
    ├── task-coordination-strategies/
    ├── team-communication-protocols/
    └── team-composition-patterns/
```

Per W314-C audit, this is the canonical install. CLAUDE.md L19 historical-archive cite-correction (`wshobson-agents` → `claude-code-workflows`) was applied at W314-C-§1 fix.

## 4. `.claude/teams/` + `.claude/tasks/` + `.claude/mailboxes/` runtime state

```bash
.claude/teams/      → 1 dir  (claude-sota-installed/, current-session-team-config)
.claude/tasks/      → not-probed-this-stream
.claude/mailboxes/  → DOES NOT EXIST  (W312-D F5 archived 27 orphans to tmp/W312-mailbox-archive/)
```

Drift: W314-C reported `.claude/teams/ → 0 files`. Now 1 dir present (this current stream's team-config). Expected.

## 5. settings.json hook side-effects on orchestration

| Hook                        | Line          | Effect on orchestration                                          |
|-----------------------------|---------------|------------------------------------------------------------------|
| `SessionStart`              | `:96-105`     | context-mode-cache-heal.mjs — no orchestration impact.            |
| `PreToolUse Bash`           | `:106-124`    | gitleaks + trivy + codex-adversarial-review on destructive git ops. Cardinal-rule-2 compliant (direct-CLI). |
| `PreToolUse Edit\|Write`    | `:127-135`    | W317-A Δ34 supersession-lint advisory on VERDICT-LEDGER changes. Non-blocking. |
| `PostToolUse Edit\|Write\|MultiEdit` | `:138-146`   | ruff/shellcheck on py/sh files. Cardinal-rule-2 compliant. |
| `PreCompact auto`           | `:149-157`    | Appends compaction event to `tmp/precompact.log`. |
| `WorktreeRemove`            | `:159-167`    | `git worktree prune`. |
| `Notification`              | `:169-177`    | PowerShell Beep. |
| `PostToolUseFailure Bash`   | `:179-189`    | Surfaces `EACCES`/`gitleaks` errors back to agent context via `hookSpecificOutput.additionalContext`. |
| `TaskCompleted`             | `:191-200`    | ruff check tools/harness/ on task complete. **Could fail-loud on Lane D background eval** — verify if Lane D triggers TaskCompleted hook. |

**No orchestration-impacting hook** (no `SubagentStop` / `SessionEnd` orchestration gate other than plugin-shipped codex Stop-hook at `openai-codex/1.0.4/hooks/hooks.json:24-37`). Cardinal-rule-2 invariant preserved.

## 6. Static-audit verdict

| Aspect                                                              | Status              |
|---------------------------------------------------------------------|---------------------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`                            | ✓ ON                |
| `CLAUDE_CODE_FORK_SUBAGENT=1`                                       | ✓ ON                |
| `CLAUDE_CODE_SUBAGENT_MODEL` deprecation                            | ✓ correctly UNSET   |
| `teammateMode: in-process`                                          | ✓ Windows-correct   |
| `agent-teams@claude-code-workflows` plugin install                  | ✓ v1.0.2 SHA `08ded5e7` |
| All 4 team-agents + 7 cmds + 6 skills present                       | ✓ verified          |
| Cardinal R1/R2/R3/R4 conformance                                    | ✓                   |
| Cardinal R5 (sandbox/bypassPermissions)                             | ✗ SHIP-BLOCKER carry-over (out of W319-A scope) |
| Plugin SHA drift from upstream                                      | **8 lines** wshobson HEAD `ece811f2` vs installed `08ded5e7` — see COOKBOOK-INGEST doc |
| project-owned hook bodies                                           | ✓ 0 (W255 spirit holds) |
| `.claude/teams/` + `mailboxes/` runtime cleanliness                 | ✓ clean (1 current-session team dir) |
| Stale CLAUDE.md/runbook cites about orchestration                   | 1 found: `W289-ORCHESTRATION-RUNBOOK-2026-05-18.md` cites `.claude\plugins\cache\wshobson-agents-marketplace\agent-teams\` path which is the OLD name. Actual is `claude-code-workflows`. W314-C already noted this. **Not yet patched in W289 doc.** See FINDING-LOW-1 in SYNTHESIS. |

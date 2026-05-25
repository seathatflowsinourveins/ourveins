# W289 Orchestration Runbook — Parallel Modes + W269 Mandate

> Stream C of W289. Closes W288 Gap #4 (`/fork` panel) + Gap #5 (`claude agents` flags, CHANGELOG 2.1.142). Anthropic claims = URL+anchor; local = file:line. Companion: `CLAUDE.md:12-14`. This = **how**; CLAUDE.md = **what**.

---

## §1 When-to-use decision matrix

| Task class | Streams | Use | Why |
|---|---|---|---|
| Single-axis fix / one-file edit | 1 | Solo | W269 exempts trivial. |
| Multi-persona review (sec/perf/arch) | ≥2 | `/team-spawn review` | Dimensions independent + need synthesis. |
| Competing-hypothesis debug | ≥2 | `/team-spawn debug` | Each hypothesis = stream. |
| Parallel-buildable feature (FE+BE+tests) | ≥3 | `/team-spawn fullstack` | Disjoint files → no conflict. |
| Research / audit sweep | ≥2 questions | `/team-spawn research` OR `Agent` fan-out via `superpowers:dispatching-parallel-agents` | W269 fires. |
| Security audit (OWASP+auth+deps) | 4 | `/team-spawn security` | Each axis = `team-reviewer` slice. |
| Multi-file migration | ≥3 | `/team-spawn migration` | Lead orchestrates slices. |
| What-if side-quest, full-context | 1 fork | `/fork` (panel-steered) | Inherits convo, no re-explain. |
| Off-critical-path batch (eval, codex-review) | 1 | `claude --bg` | Frees interactive REPL. |
| Multi-session parallel (≥2 worktrees) | 2-3 | `--fork-session` + worktree-each | W280d safety. |
| Detach current convo | 1 → bg | `/bg <prompt>` | Saved-conv resume; subagents reset. |

Cites: sub-agents `#fork-the-current-conversation` · agent-teams `#choose-a-display-mode` · agent-view `#from-your-shell` · `CLAUDE.md:12-14`. Full URLs in §"Cite index".

---

## §2 The 7 `/team-spawn` presets

Source: `.claude\plugins\cache\wshobson-agents-marketplace\agent-teams\commands\team-spawn.md`. Gate: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (`.claude/settings.json:16`).

| Preset | Composition | N | Fire when | NOT when |
|---|---|---|---|---|
| `review` | 3× `team-reviewer` (sec · perf · arch) | 3 | Pre-merge multi-dim review | Single-dim → solo `code-reviewer` |
| `debug` | 3× `team-debugger`, one hypothesis each | 3 | ≥2 competing root-causes | Deterministic repro + known region |
| `feature` | 1× `team-lead` + 2× `team-implementer` | 3 | Parallel-buildable slices | Single-file edit |
| `fullstack` | 1× `team-implementer` FE + BE + tests + 1× `team-lead` | 4 | Cross-stack independent layers | FE-only or BE-only |
| `research` | 3× `general-purpose` (Grep/Glob/Read + WebSearch/WebFetch) | 3 | ≥2 questions/sources | Single-doc lookup |
| `security` | 1× `team-reviewer` (OWASP) + (auth/AC) + (deps) + 1× `team-lead` | 4 | Whole-codebase audit | Single-file CVE |
| `migration` | 1× `team-lead` + 2-3× `team-implementer` (slice each) | 3-4 | Multi-file migration | Single-call API swap |

Invocation: `/team-spawn <preset> [--name X] [--members N] [--delegate]`. `--delegate` transfers control to lead.

---

## §3 `/fork` slash + steering panel

Per `https://docs.anthropic.com/en/docs/claude-code/sub-agents#fork-the-current-conversation` + `#observe-and-steer-running-forks`. Requires `CLAUDE_CODE_FORK_SUBAGENT=1` (`.claude/settings.json:6`) + CC ≥ v2.1.117.

**Spawn**: `/fork <directive>` — auto-named from first words. Ex: `/fork draft unit tests for the parser changes`. Fork appears as panel row below prompt, runs in bg; final result returns as one message.

**Steering keys** (verbatim, sub-agents §"Observe and steer running forks"):

| Key | Action |
|---|---|
| `↑`/`↓` | Move between rows |
| `Enter` | Open transcript + send follow-up |
| `x` | Dismiss finished / stop running |
| `Esc` | Return focus to prompt |

**Use-cases**: debugging-branch explorer · what-if side-quest · multi-prompt bake-off.

**Fork vs named subagent** (§"How forks differ from named subagents"):

| | Fork | Named subagent (`Agent`) |
|---|---|---|
| Context | Full convo inherited | Fresh + passed prompt |
| Sys prompt + tools | Same as main | From definition |
| Auto-trigger | Replaces `general-purpose` when env=1 | `Agent` call |
| Visibility | Panel row + final msg | Tool result |

Env-var fork = automatic on every `general-purpose` Agent call; `/fork` = explicit. Same machinery; panel UI is the slash affordance.

---

## §4 `claude agents` CLI flag matrix (CHANGELOG 2.1.142, May 14 2026)

Per `https://code.claude.com/docs/en/changelog#2-1-142` + `https://code.claude.com/docs/en/agent-view#permission-mode-model-and-effort`. Earlier versions reject with `unknown-option`.

| Flag | Meaning | Example | Use |
|---|---|---|---|
| `--add-dir <path>` | Mount extra dir (loads its CLAUDE.md) | `--add-dir Z:/extra-context` | Cross-repo |
| `--settings <file>` | Override `settings.json` | `--settings ./eval-settings.json` | Eval lane |
| `--mcp-config <file>` | Override `.mcp.json` | `--mcp-config ./minimal-mcp.json` | Reduce MCP load |
| `--plugin-dir <path>` | Override plugin cache | `--plugin-dir ./test-plugins` | Test plugin variant |
| `--permission-mode <m>` | `plan` · `acceptEdits` · `auto` · `bypassPermissions` | `--permission-mode plan` | Read-only |
| `--model <n>` | `opus` · `sonnet` · `haiku` | `--model opus` | Force Opus |
| `--effort <l>` | `low` · `medium` · `high` · `xhigh` | `--effort xhigh` | Max-effort batch |
| `--dangerously-skip-permissions` | Bypass-mode default | (as-named) | Trusted sandbox |

Active defaults appear in **footer below dispatch input**. `bypassPermissions`/`auto` refused until once-accepted interactively.

**Per-`--bg` flags** (launch one session, not configure view):

| Flag | Example |
|---|---|
| `--bg "<prompt>"` | `claude --bg "investigate flaky test"` |
| `--agent <name>` | `claude --agent code-reviewer --bg "address PR 1234"` |
| `--name <display>` | `claude --bg --name "flaky-test-fix" "..."` |
| `--fork-session` | W280d parallel-safe convo fork |

---

## §5 Background-session lifecycle

Per `https://code.claude.com/docs/en/agent-view#from-your-shell` + `#manage-sessions-from-the-shell`.

```text
claude --bg "investigate flaky SettingsChangeDetector test"   # → backgrounded · 7c5dcf5d
claude agents              # list all
claude attach 7c5dcf5d     # open in this terminal
claude logs 7c5dcf5d       # tail recent output
claude stop 7c5dcf5d       # terminate
```

**Runtime patterns**:
- Nightly eval: `claude --bg --name nightly-eval --agent eval-runner "run harness/eval_harness.py"`.
- Codex-review dispatch: stop-time review-gate (`CLAUDE.md:42` W280a) backgrounds review; main keeps coding.
- Research batch: `claude --bg --add-dir Z:/repos/deps --plugin-dir ./test-plugins --effort xhigh "scan top-50 repos"`.

**From inside session**: `/bg <prompt>` (alias `/background`) detaches current convo. Running subagents/monitors/bg-commands **do NOT transfer** — fresh process resumes from saved conv. Claude confirms if any are running.

---

## §6 Parallel-session safety (W280d)

Per cli-reference `--fork-session` + `CLAUDE.md:14`. Running 2+ CC sessions:

1. **NEVER bare-resume** same session-id in 2 terminals → state divergence + msg corruption. Use `--fork-session` / `/branch`.
2. **One worktree per session** — ex: `Z:/claude-sota-installed-W272`, `-W273`, `-state/wt/w280`.
3. **Rebase, NOT merge** — linear history.
4. **`--force-with-lease`, NEVER `--force`** — preserves peer pushes.
5. **≤3 cap** — cognitive + FalkorDB/Ollama contention.
6. **Auto-prune** — `.claude/settings.json:131-140` `WorktreeRemove` runs `git worktree prune`.

---

## §7 W269 mandate — operating procedure

`CLAUDE.md:13`: research/audit/review/debug/migration/large-feature w/ **≥2 independent streams** MUST dispatch agent-teams OR parallel-Agent fan-out before solo serial.

**Lifecycle** (cite agent-teams `#control-your-agent-team`):

1. **Detect ≥2 streams** in request or planning.
2. **Pick mode**: `/team-spawn <preset>` (lead+mailbox) OR `Agent` fan-out (cap=4, `superpowers:dispatching-parallel-agents`).
3. **Record rationale**: preset+reason; if solo, explicit (trivial / explicit-solo / user-forbidden).
4. **Tools** (in-process `teammateMode`, `.claude/settings.json:365`):
   - `TaskCreate` — TaskID + owner per stream.
   - `SendMessage {to, message}` — direct teammate-to-teammate (plain text NOT cross-visible).
   - `TaskUpdate` — mark complete.
   - Shutdown: `{type: shutdown_request}` → `{type: shutdown_response, approve: true}` / `TeamDelete`.
5. **Synthesize**: lead collates `final_message` per stream.

**Solo exemptions**: trivial · explicit-solo · user-forbidden. MUST record in commit msg or transcript.

---

## §8 Anti-patterns

| Anti-pattern | Fix |
|---|---|
| Bare `claude -r <id>` in 2 terminals | `--fork-session` or separate worktrees (§6) |
| Solo-serial w/o rationale on ≥2-stream task | `/team-spawn` or `Agent` fan-out (§7) |
| `subagent_type: general-purpose` when persona matters | Use `agent-teams:team-reviewer`/`team-debugger`/etc. |
| `general-purpose` Agent forks main convo unexpectedly | Accept fork (`CLAUDE_CODE_FORK_SUBAGENT=1` deliberate) OR use named subagent for isolation |
| Code-reviewer empty `final_message` (W288-P1) | Re-dispatch with explicit "respond via SendMessage with verdict" clause; treat empty as transient |
| Backgrounding session with running subagents/monitors | Confirm prompt fires; subagents reset on bg — finish first or accept reset |
| `claude agents --permission-mode plan` on v<2.1.142 | Upgrade; flag rejects with `unknown-option` |
| `tmux` split-pane on Windows | `teammateMode: in-process` (`.claude/settings.json:365`); tmux/iTerm2 is macOS-best |

---

## §9 Worked example — this W289 cycle

Parallel-Agent fan-out (cap=4):

```text
# 1. Lead detects 4 disjoint gap-closure streams (A/B/C/D); each owns its
#    own files → no cross-stream coordination → fan-out NOT agent-teams.
# 2. Single message dispatches: A=research B=discovery C=runbook(THIS) D=pipeline.
# 3. Each = Agent(subagent_type=general-purpose, prompt=<scoped brief with
#    file-ownership boundary>); no inter-stream SendMessage.
# 4. Each returns final_message; lead aggregates.
# 5. /codex:adversarial-review --wait on diff; iterate HIGH (r1:f4b0b05,
#    r2:c7996db); MEDIUM doesn't block.
# 6. Lead commits + pushes --force-with-lease.
```

Agent-teams analog:

```text
/team-spawn research --name w289-gap-closure --members 4 --delegate
# → 4 general-purpose teammates (in-process teammateMode); lead enters
#   delegation, assigns via TaskCreate + SendMessage; teammates report via
#   SendMessage("team-lead", "<verdict>"); lead aggregates → TeamDelete /
#   shutdown_request per teammate.
```

---

## Cite index

- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` §"Fork the current conversation" · §"Observe and steer running forks" · §"How forks differ from named subagents"
- `https://code.claude.com/docs/en/sub-agents` (mirror) · `https://code.claude.com/docs/en/agent-teams` §"Choose a display mode" · §"Control your agent team"
- `https://code.claude.com/docs/en/agent-view` §"From your shell" · §"Permission mode, model, and effort" · §"Manage sessions from the shell"
- `https://code.claude.com/docs/en/cli-reference` · `https://docs.anthropic.com/en/docs/claude-code/cli-reference` · `https://code.claude.com/docs/en/headless` · `https://code.claude.com/docs/en/changelog#2-1-142`
- `CLAUDE.md:12-14` · `.claude/settings.json:6,16,131-140,365` · `.claude\plugins\cache\wshobson-agents-marketplace\agent-teams\commands\team-spawn.md`

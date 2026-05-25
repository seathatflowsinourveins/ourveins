# W262 — Parallel-Sessions + Git-Worktree Practice Audit (2026-05-17)

> Audit of `Z:\claude-sota-installed\docs\architecture\parallel-sessions\PARALLEL-SESSION-ARCHITECTURE.md` (HEAD `986a502`, branch `parallel-sessions-arch`) against 2026-05 SOTA + the live runtime state. Sources are verified at file:line; ccmanager freshness via GitHub MCP `list_commits` (HEAD `1e123a9`, 2026-05-17T13:18Z).

## 1 · SOTA-fitness score of the synthesis doc

**8.7 / 10.** The two-axis decomposition (isolation × distribution + identity) is the canonical primary-source frame (CCBP `claude-subagents.md:34` confirms `isolation: worktree`; CCBP `claude-cli-startup-flags.md:125` confirms `--worktree`/`-w`). The §7 12-row SHIP-DECISION matrix is fully cite-anchored; the §9 live-incident receipt (`git log` `09f4efa..bc35597`, both writers on `main`) is real and reproducible. STREAM-B is rigorous — 14 tools, D1-D10 rubric, null-result honestly declared, ccmanager pinned at HEAD SHA + license. Deducted points: (a) §7 row 8 still calls hindsight `INSTALLED-LIVE` but pg0-on-C: makes it cross-runtime *shared* not parallel-isolated — the parallel-sessions story for hindsight is implicit, not stated; (b) `defaultMode: bypassPermissions` (settings.json:73) raises the safety bar for `claude --bg` autonomy that §2.3 implies; not addressed; (c) STREAM-A/C/D were not loaded this pass — score is on the synthesis + STREAM-B only.

## 2 · Current capability matrix (4 modes × actual wiring)

| Mode | CC primitive | Wired? | Evidence |
|---|---|---|---|
| **Subagents** | `Agent` tool + `CLAUDE_CODE_FORK_SUBAGENT=1` | LIVE | `.claude/settings.json:7` |
| **Agent teams** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `agent-teams@claude-code-workflows` v1.0.2 | LIVE | settings.json:16; plugin enabled :161 |
| **Git worktrees** | `--worktree`, `EnterWorktree`, `isolation: worktree`, `WorktreeRemove` hook | PARTIAL | hook present at settings.json:109-118; **no `worktree.baseRef`** key; **no `teammateMode`** key |
| **Background sessions** | `claude --bg`, `claude agents/attach/logs/stop` | NATIVE-LIVE | not wired explicitly — relies on CC defaults |

**Live worktree state** (`git worktree list`): 2 active — `Z:\claude-sota-installed` (`main` @ `f8059ee`) and `Z:\claude-sota-installed-parallel-arch` (`parallel-sessions-arch` @ `986a502`). **3 orphan empty dirs in `.claude/worktrees/`** — `agent-aa037778b4472cf76`, `serene-johnson-d364cb`, `w259-final-synthesis` — git admin data already pruned, only empty husks remain (verified `ls -la`, no `.git` files). The architecture doc's W6 punch-list item is correct but stale: the cleanup is *just* `rmdir`, no `git worktree prune` needed.

## 3 · SOTA gap list (top 5, prioritized)

1. **`worktree.baseRef: "head"` unset** — punch-list W1. Without it, worktree subagents fork from the last-pushed commit and miss in-flight work. **Apply**: add `"worktree": {"baseRef": "head"}` to `.claude/settings.json` (line ~119 alongside `defaultShell`).
2. **`teammateMode: "in-process"` unset** — punch-list W2. Windows Terminal lacks split-pane support; the implicit `tmux` teammateMode default fails silently. **Apply**: add `"teammateMode": "in-process"` to settings.json.
3. **3 orphan worktree dirs** — punch-list W6. **Apply**: `rmdir Z:\claude-sota-installed\.claude\worktrees\agent-aa037778b4472cf76 Z:\claude-sota-installed\.claude\worktrees\serene-johnson-d364cb Z:\claude-sota-installed\.claude\worktrees\w259-final-synthesis`.
4. **No file-ownership/mailbox protocol cited in CLAUDE.md** — `agent-teams` ships `parallel-feature-development` skill (file:`.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/parallel-feature-development/SKILL.md:14`: "Establishing file ownership boundaries"); `team-communication-protocols/SKILL.md:34` covers broadcast vs direct. Neither is referenced in `CLAUDE.md` so they don't trigger reliably during live parallel work — exactly the §9 collision condition. **Apply**: append a 2-line pointer to `CLAUDE.md`'s parallel-execution paragraph (line 19): "Parallel-writer discipline: `agent-skills:parallel-feature-development` (file-ownership) + `agent-teams:team-communication-protocols` (mailbox)."
5. **`parallel-sessions-arch` branch never merged** — 7 commits ahead of `main` (`46b2d90`, `5a8da31`, `37394f8`, `7b285d1`, `ec0e8d6`, `07a3d5f`, `b0a4043`, `986a502`); `37394f8` is *titled* "feat(parallel-sessions): wire worktree.baseRef + teammateMode + memory busy_timeout" but landed only on the side branch, not in the active `main` settings.json. **Apply**: from worktree `Z:\claude-sota-installed-parallel-arch`, `git rebase main && git checkout main && git merge --ff-only parallel-sessions-arch` (per arch doc §9.1 reconcile procedure).

## 4 · ccmanager verdict

**STUDY-PILOT — confirms the arch doc verdict.** GitHub MCP refresh: HEAD advanced `99c8edb`→`1e123a9` (v4.1.17→v4.1.18) between research date and today; commit `8d38555` (2026-05-17) fixes session detach + scrollback restore, `395f088` fixes detached-HEAD-on-remote-worktree edge case (Patrick von Platen, HF). Cadence remains professional, MIT, node-pty/ConPTY native-Windows. **Do NOT install as a plugin/hook** (cardinal-rule-1: not a trusted upstream channel). Pilot ephemerally only: `npx ccmanager` from `Z:\claude-sota-installed`; promote to a documented optional launcher in `CLAUDE.local.md` only if ≥3 concurrent sessions render stably. Outside `.claude/` regardless.

## 5 · Concurrent-session safety findings

- **File-ownership boundaries** documented in `agent-teams` `parallel-feature-development/SKILL.md` but *not* referenced from `CLAUDE.md` — invisible to the autoloader.
- **No lock files / no mailbox dir** in the runtime — agent-teams' `team-communication-protocols` is the upstream-blessed mailbox; not wired into a coordination workflow yet.
- **Live incident (arch doc §9, verified via `git log --all`)**: `46b2d90` "docs(parallel-sessions)" was authored by the W259-v16 session and swept the parallel-sessions stream files into a foreign commit. Branch isolation (gap #5) would have prevented it.

## 6 · Next steps — concrete commands

```powershell
# Gap 3 — orphan dirs
Remove-Item -Recurse -Force Z:\claude-sota-installed\.claude\worktrees\agent-aa037778b4472cf76, Z:\claude-sota-installed\.claude\worktrees\serene-johnson-d364cb, Z:\claude-sota-installed\.claude\worktrees\w259-final-synthesis

# Gap 5 — fold parallel-sessions-arch into main (after Gap 1/2 are merged on the branch)
cd Z:\claude-sota-installed-parallel-arch ; git rebase main
cd Z:\claude-sota-installed ; git merge --ff-only parallel-sessions-arch
```

Gap 1+2 (settings.json edits) and Gap 4 (CLAUDE.md pointer) are file edits — apply on the `parallel-sessions-arch` worktree first to model the architecture's own discipline (§2.2 F1: one writer per branch), then ff-merge.

**Word count: 692.**

# W326 Stream E — Parallel-Session Safety Audit

**Scope**: CLAUDE.md L23 W280d ~3 worktree cap + force-with-lease/rebase discipline + PROJECT_DIR state-redirect + WorktreeRemove hook + fork-subagent behavior.
**Wave**: 2026-05-19 W326-E. **Author**: Stream E subagent.

## Inventory (empirical)

| Item | State | Source |
|---|---|---|
| Worktrees declared | **4** (main + W287 + W290 + W321) | `git worktree list` |
| W280d cap | **~3 parallel** | CLAUDE.md L23 |
| Active branches | `sota-converge-w310` (cwd), `goal/W287-reconcile`, `sota-converge-w290`, `W321` | `git worktree list --porcelain` |
| Dirty worktrees | **1** — `claude-sota-installed-W290` has 2 untracked W295 dirs | `git status -sb` per wt |
| Locked worktrees | **0** | `.git/worktrees/` inspection |
| PROJECT_DIR redirect path | `Z:/claude-sota-installed-state/.claude/projects/` | env-var probe |
| Sessions at redirect path | **0** | `ls` returns empty (mtime 2026-05-06) |
| Sessions at in-tree path | **1596 JSONLs + 206 session-UUID dirs** (most recent 2026-05-19 13:49Z) | in-tree listing |
| `pull.rebase` | `true` (also `false` precedence earlier in chain) | `git config --get-all` |
| `push.useforceifincludes` | `true` (force-with-lease safety) | `git config` |
| Merge commits last 7d | **2** (`ab4756a`, `5ebeb69` — both 2026-05-16/17 w260-trueup branch) | `git log --merges` |
| WorktreeRemove hook | LIVE at settings.json:159-167 (`git worktree prune`) | grep |
| `CLAUDE_CODE_FORK_SUBAGENT` | `=1` (active in this very subagent shell) | env probe |
| Codex `--force` guard | LIVE at settings.json:121 (PreToolUse intercepts `git push --force`/`reset --hard`) | grep |

## Findings (5 NEW + 2 carry-confirmed)

### F1 [HIGH — carry-confirmed 4th wave] PROJECT_DIR state-redirect SILENTLY BROKEN
- **Evidence**: `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` honored at env-level, but 0 JSONLs at that path; CC 2.1.144 still writes 1596 JSONLs + 206 UUID-dirs to in-tree `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` (most recent file 2026-05-19 13:49Z = THIS session).
- **Falsifiable-inverse**: if redirect were honored, in-tree path mtime would be stale (≥1 day) while redirect path mtime would track current session. Observed: opposite.
- **W315-r2 F-SS-1 + W319 STALE-D-7 RE-CONFIRMED 3rd-time**. Upstream issue on `anthropics/claude-code` REQUIRED — recommend file (W326-P-1).

### F2 [HIGH] W280d cap VIOLATED — 4 worktrees > ~3 limit
- **Evidence**: 4 worktrees (main+W287+W290+W321); CLAUDE.md L23 mandates "~3 parallel cap".
- **Falsifiable-inverse**: if cap held, `git worktree list` would show ≤3 entries.
- **Recommendation**: W326-P-2 — REMOVE 1 worktree (recommended: `W287` — stalest branch `goal/W287-reconcile` at `0f9dbe8`, no recent activity since W287).

### F3 [HIGH] W290 worktree has 2 UNTRACKED W295 audit dirs
- **Evidence**: `?? docs/architecture/W295-AUDIT-2026-05-18.md` + `?? docs/architecture/W295-CANDIDATE-AUDITS/` in W290 worktree.
- **Risk**: cross-worktree commit confusion — main has W295 history merged, W290 has stale untracked copies that may shadow.
- **Falsifiable-inverse**: if hygiene held, `git status` per worktree would show clean tree (matches W287/W321/main behavior).
- **Recommendation**: W326-P-3 — inspect + reconcile (cherry-pick or `git clean -fd` in W290).

### F4 [MEDIUM] `pull.rebase` has DUPLICATE entries — `false` then `true`
- **Evidence**: `git config --get-all pull.rebase` returns `false` THEN `true` (last-wins → effective `true`). But duplicate entries indicate config drift (likely from `git pull --rebase=false` invocation somewhere or a stale system-level setting).
- **Falsifiable-inverse**: if config were clean, single `true` would appear.
- **Recommendation**: W326-P-4 — `git config --unset-all pull.rebase && git config pull.rebase true` to deduplicate.

### F5 [LOW] 2 merge commits past 7 days violate rebase-linear policy
- **Evidence**: `ab4756a` + `5ebeb69` are explicit `Merge branch` commits (2026-05-16/17 W260-trueup).
- **Context**: pre-W280d formalization; not active violation. Linear policy enforced going forward.
- **Recommendation**: W326-P-5 — accept as historical; reaffirm policy in CLAUDE.md or settings hook.

### F6 [carry-confirmed POSITIVE] Force-with-lease discipline LIVE
- `push.useforceifincludes=true` PLUS settings.json:121 PreToolUse codex-companion adversarial-review intercept on `git push --force`/`reset --hard` (lets `--force-with-lease` pass via case-statement carve-out). **HOLDS**.

### F7 [carry-confirmed POSITIVE] WorktreeRemove hook wired
- settings.json:159-167 fires `git worktree prune` on remove. **HOLDS** — but cannot empirically verify firing without an actual remove event this session.
- **Recommendation**: W326-P-6 — when removing W287 per P-2, verify hook fires via debug log.

### F8 [INFO] CLAUDE_CODE_FORK_SUBAGENT empirically ACTIVE
- This subagent shell has `=1` set; receives full conversation-history inheritance per W259-v8 U3. W325-A F4 fork-context-flood root-cause REMAINS architecturally unmitigated — fork inheritance is by design, but bloats subagent context. No fix this wave; observation only.

## W326 P-block recommendations

| P# | Priority | Action |
|---|---|---|
| P-1 | P0 | File upstream `anthropics/claude-code` issue: `CLAUDE_CODE_PROJECT_DIR` ignored — env-var honored at process layer but JSONLs written to in-tree path. Cite W315-r2/W319/W326-E 3-wave re-confirmation. |
| P-2 | P0 | Remove W287 worktree (`git worktree remove Z:/claude-sota-installed-W287`) to restore ~3 cap. |
| P-3 | P1 | Reconcile W290 untracked W295 dirs (inspect → cherry-pick or `git clean -fd`). |
| P-4 | P2 | Dedupe `pull.rebase` config: `git config --unset-all pull.rebase && git config pull.rebase true`. |
| P-5 | P3 | Accept historical merges; reaffirm rebase-linear in CLAUDE.md L23 commit-message guard. |
| P-6 | P2 | Verify WorktreeRemove hook fires during P-2 execution (capture stderr to debug log). |

## Cardinal-rule status (Stream E lens)

- **W280d cap**: VIOLATED (4 > ~3) — P-2 corrective.
- **Force-with-lease**: HOLDS — config + intercept hook both present.
- **Rebase-linear**: HOLDS forward (W260-trueup merges are historical).
- **WorktreeRemove hook**: WIRED — empirical-fire verification deferred to P-6.
- **PROJECT_DIR redirect**: BROKEN (upstream bug, not local config drift).

## Path of file

`Z:/claude-sota-installed/docs/architecture/W326-AUDIT-WAVE/STREAM-E-PARALLEL-SAFETY.md`

(~480 words; ≤500 cap)

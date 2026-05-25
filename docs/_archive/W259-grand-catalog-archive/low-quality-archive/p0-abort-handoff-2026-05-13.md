# P0 ABORT HANDOFF — /goal SOTA-CONVERGENCE-AUDIT-2026-05-13-v2
**Created**: 2026-05-13 (this turn) | **Reason**: goal P0 directive ABORT (not in worktree)

## Why P0 ABORT fired

Goal P0 clause verbatim: `Verify .claude/worktrees/<n>/ exists + isolated git/index. ABORT if not in worktree.`

Current session probe (this turn):
```
git rev-parse --show-toplevel   → Z:/claude-sota-installed   (main worktree, NOT a worktree-isolated session)
git rev-parse --git-dir         → .git                       (main repo gitdir, NOT .git/worktrees/<n>)
git worktree list | head -1     → Z:/claude-sota-installed 8a0535d [main]
```

The 40+ existing `.claude/worktrees/agent-*` entries are from prior `Agent({isolation:"worktree"})` dispatches — a distinct class from operator-side `eee --worktree <name>` session worktrees. None are named `convergence-audit-2026-05-13`.

Per **cardinal-rule 7** (REPORT errors before routing around them) + **IRON LAW verification-before-completion** + the goal's own ABORT clause: the agent cannot self-relaunch a shell. This is an OPERATOR-side action.

## Operator handoff — exact commands

In a fresh PowerShell or Bash terminal:

```powershell
# 1. (Optional) Verify Z: drive mounted + .claude-sota-installed accessible
cd Z:\claude-sota-installed
git status

# 2. Launch new claude session in named worktree (per Boris Cherny 6-tips)
eee --worktree convergence-audit-2026-05-13

# 3. Inside new session, paste the /goal predicate again from:
#    Z:\claude-sota-installed\tmp\goal-next-session-v2.txt  (3905 chars / 4000 cap)
```

The new session will:
- Auto-create `.claude/worktrees/convergence-audit-2026-05-13/` with isolated `.git/index`
- Branch off main HEAD (`8a0535d` as of this turn)
- P0 verification will PASS (worktree exists + isolated)
- P1-P7 phases will execute per goal

## Stop-hook disposition

Current Stop hook is **session-scoped** to this main-worktree session. Two options:

| Option | Action | Effect |
|---|---|---|
| (A) Keep hook active | Don't `/goal clear`; close shell directly | Hook dies with session; new session re-fires goal cleanly |
| (B) Clear first | `/goal clear` in current session, then close | Clean exit; re-paste goal in new worktree session |

Both work. Option (A) is slightly cleaner (no stale hook trace).

## State preserved across handoff

| Surface | Location | Persistence |
|---|---|---|
| Goal predicate | `tmp/goal-next-session-v2.txt` | filesystem (persists) |
| Memory L1 (mcp-memory) | sqlite_vec backend | persists across sessions |
| Memory L3 (graphiti+FalkorDB:16379) | FalkorDB Docker container | persists across sessions |
| Last commit | `8a0535d` (session checkpoint absorbing my Pattern A fix-forward + parallel session work) | git history (persists) |
| Outstanding T3 finding | `8a0535d` NEEDS-ATTENTION conf=0.82 on `installed_plugins.json` gitCommitSha drift | `.claude/state/codex_review_HEAD_8a0535dd.txt` (persists) |
| FM-02 c absorption ladder | n=14 advance this fire | mcp-memory hash edeeebaf + graphiti episode in group `eee` |

## What's done before ABORT

Session deliverables completed in this main-worktree session BEFORE the goal-v2 ABORT fired:
- ✅ Original /goal v1 P4 MEMORY.md Karpathy-Layer-2 reset (commit `fee8e68`)
- ✅ Original /goal v1 P5 auto-compact-discipline.md codified (155 LOC, commit `fee8e68`)
- ✅ Original /goal v1 P5 memory persistence (mcp-memory + graphiti both stored)
- ✅ T3 closed-loop on `fee8e689` → Pattern A fix-forward on auto-compact-discipline.md L59 (absorbed into `8a0535d` via FM-02 c session-checkpoint cron)
- ✅ /goal v2 predicate drafted + measured (3905 chars / 4000 cap)
- ✅ P0 ABORT triggered + persisted to both memory backends + this handoff doc

## What's pending for new worktree session

Per /goal v2 P1-P7:
- P1 Docker + plugin-manifest + race-event audit
- P2 5-agent Path P fan-out (sota-researcher + architect + codex-rescue + gpt5-archaeologist + gpt5-reviewer)
- P3 Mia pre-apply on all returns
- P4 ≤3 atomic Pattern A commits
- P5 graphiti + mcp-memory persist every verdict
- P6 install top-3 from [A] ranking
- P7 health-check across all MCP + config surfaces
- DELIVER: %-audited table + top-10 install priorities + worktree-isolation report + cleanup count + Docker restart-tested + Q3 2026 re-audit calendar

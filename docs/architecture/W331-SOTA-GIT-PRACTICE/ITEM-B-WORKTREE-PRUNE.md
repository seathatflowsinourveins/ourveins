# Item-B — Worktree Prune (6 worktrees → ~3-cap)

**Status**: AUDIT-COMPLETE — operator-decision required for 3 worktrees; 2 SAFE-REMOVE.

**Wave**: W331 Stream-GIT P0-5 item (b)
**Cite-anchor**: CLAUDE.md L14 W280d parallel-session safety — "~3 parallel cap (cognitive + token budget)".

## Audit results

Audit run 2026-05-19 against `goal/W331-sota-convergence` HEAD `2add8fc`. Counts are `<commits-in-W331-not-in-WT>  <commits-in-WT-not-in-W331>` (left-right per `git rev-list --left-right --count`).

| Worktree path | Branch | HEAD SHA | Last commit (UTC-4) | Status | Ahead-W331 | Behind-W331 | Verdict |
|---|---|---|---|---|---|---|---|
| `Z:/claude-sota-installed` | `goal/W331-sota-convergence` | `2add8fc` | (current) | clean | 0 | 0 | **KEEP (primary)** |
| `.claude/worktrees/W328-sota-unleash` | `worktree-W328-sota-unleash` | `7c8b4ff` | 2026-05-19 18:29 | clean | 18 | 5 | **KEEP** (active; recent ship 2026-05-19; 5 unique commits ahead of W331) |
| `Z:/claude-sota-installed-W287` | `goal/W287-reconcile` | `0f9dbe8` | 2026-05-18 01:03 | clean | 313 | 9 | **STAY-FOR-OPERATOR-DECISION** (very stale; 313 commits behind; but holds 9 unique commits — verify operator-locked status per CLAUDE.md L23 "W272/W273 operator-locked" pattern) |
| `Z:/claude-sota-installed-W290` | `sota-converge-w290` | `373ef71` | 2026-05-18 14:40 | **DIRTY** (untracked: `docs/architecture/W295-AUDIT-2026-05-18.md` + `docs/architecture/W295-CANDIDATE-AUDITS/`) | 246 | 15 | **STAY-FOR-OPERATOR-DECISION** (uncommitted W295 audit work — DO NOT remove until staged + committed) |
| `Z:/claude-sota-installed-W321` | `W321` | `3731ca7` | 2026-05-19 14:36 | clean | 48 | 0 | **SAFE-REMOVE** (zero unique commits ahead of W331 — branch is fully merged/superseded) |
| `Z:/claude-sota-installed-W330` | `sota-converge-w330` | `3a081d6` | 2026-05-19 17:11 | clean | 28 | 0 | **SAFE-REMOVE** (zero unique commits ahead of W331 — fully merged/superseded) |

**Summary**: 6 worktrees total → 1 primary + 1 KEEP + 2 SAFE-REMOVE + 2 STAY-FOR-OPERATOR-DECISION. Removing the 2 safe entries reduces to 4 worktrees (within ~3-cap tolerance band per CLAUDE.md L14).

## Paste-ready commands (operator-side action only)

**Do NOT execute these from this agent session** — operator must run from a CLI with their credentials + git-safety policy active.

### REMOVE-verdict: W321 (zero unique commits)

```bash
# Pre-removal preservation: tag the HEAD SHA so we can recreate if needed
git -C Z:/claude-sota-installed tag preserve/W321-pre-prune 3731ca7

# Remove worktree
git -C Z:/claude-sota-installed worktree remove Z:/claude-sota-installed-W321

# Prune stale admin records
git -C Z:/claude-sota-installed worktree prune
```

### REMOVE-verdict: W330 (zero unique commits)

```bash
# Pre-removal preservation
git -C Z:/claude-sota-installed tag preserve/W330-pre-prune 3a081d6

# Remove worktree
git -C Z:/claude-sota-installed worktree remove Z:/claude-sota-installed-W330

# Prune stale admin records
git -C Z:/claude-sota-installed worktree prune
```

### STAY-FOR-OPERATOR-DECISION (no action)

- `Z:/claude-sota-installed-W287` — 9 unique commits not in W331. Decision required:
  - **Option 1**: cherry-pick into W331 then `worktree remove`.
  - **Option 2**: confirm W287 is operator-locked (per W272/W273 precedent) and KEEP.
  - **Option 3**: merge into goal/W331 then `worktree remove`.
- `Z:/claude-sota-installed-W290` — uncommitted W295 audit files present. Decision required:
  - **Option 1**: commit the W295 audit work into `sota-converge-w290` branch, then evaluate ahead-count for cherry-pick/merge.
  - **Option 2**: archive uncommitted files outside the worktree, then `worktree remove --force` (note: `--force` is required if dirty).

## Rollback (restore a removed worktree)

If a SAFE-REMOVE turns out wrong, the preserved tag re-creates the worktree exactly:

```bash
# Re-create from preserved SHA
git -C Z:/claude-sota-installed worktree add Z:/claude-sota-installed-W321 -b W321 preserve/W321-pre-prune

# Same pattern for W330:
git -C Z:/claude-sota-installed worktree add Z:/claude-sota-installed-W330 -b sota-converge-w330 preserve/W330-pre-prune
```

After confirmation the branches are no longer needed, optionally drop the preserve tags:

```bash
git -C Z:/claude-sota-installed tag -d preserve/W321-pre-prune preserve/W330-pre-prune
```

## Risk + reversibility

- **Risk**: LOW — preserve-tag pattern guarantees exact-SHA recovery; no force-removes proposed.
- **Reversibility**: FULL via `git worktree add ... preserve/<tag>` for SAFE-REMOVE entries; STAY-FOR-OPERATOR-DECISION worktrees are untouched.
- **Side-effects**: `worktree prune` cleans admin records ONLY; no data loss.

## Cite anchors

- Git worktree semantics: `https://git-scm.com/docs/git-worktree` — `worktree remove` requires clean state; `prune` cleans admin records.
- CLAUDE.md L14 W280d: "~3 parallel cap (cognitive + token budget); remove worktree on merge".
- Verified-at: 2026-05-19 against `goal/W331-sota-convergence` HEAD `2add8fc`.

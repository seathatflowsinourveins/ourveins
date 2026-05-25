# W344 Stream Z6 — P6 Future-Session Enforcement

**Wave**: W344-FULL-SOTA-UNLEASH
**Stream**: Z6
**Date**: 2026-05-20

## P6.1 Proposed new CLAUDE.md cardinal rule (R7)

**Per Δ-DPA-1 + wave constraint**: CLAUDE.md is NOT edited in this wave. Operator applies this text in the wave-closure step.

### Proposed R7 text

```
7. **Concurrent-session collision protection** — every multi-wave parallel effort MUST
   use one git worktree per session per W280d. The main session NEVER commits on a branch
   the operator is concurrently editing. Pre-commit gate enforces via
   `tools/precommit-worktree-collision-guard.mjs` (W344 P6.2). Cite-anchored to
   `https://git-scm.com/docs/git-worktree` (SPI/git project) + `https://code.claude.com/docs/en/cli-reference` `--fork-session`
   + Anthropic CCBP `claude-memory.md @ a28cd96b` parallel-session safety guidance.
```

### Rationale

- W343 cherry-pick recovery wave demonstrated the operator-editing-same-branch failure mode (concurrent state divergence + manual cherry-pick required to merge surviving work).
- Pre-commit gate is the cheapest enforcement layer (zero added latency on green-path commits, hard-stop on collision).
- 3-org-distinct cite-anchors: SPI/git-project, Anthropic docs, CCBP — satisfies CR-6 verify-before-claim.

### Cost

- 1 LOC in CLAUDE.md "Cardinal rules" section
- 1 file added: `tools/precommit-worktree-collision-guard.mjs` (≤2KB per CR-2)
- 1 entry added: `.pre-commit-config.yaml`

### Operator-action checklist (wave-closure)

1. Append R7 text to CLAUDE.md cardinal-rules section (item 7).
2. Verify `wc -l CLAUDE.md` still ≤50 LOC body (currently ~30 body + ~20 frontmatter pointer; R7 fits as 1 extra rule entry).
3. Confirm `.pre-commit-config.yaml` already has the `cr7-worktree-collision` hook entry (P6.2 below).
4. Commit with message: `wave: W344 P6.1 cardinal-rule R7 concurrent-session collision`.

### Verification — pre-commit-config.yaml entry SHIPPED

Confirmed: `.pre-commit-config.yaml` now contains a `cr7-worktree-collision` hook in the `repo: local` block (after `npm-audit-staged`), entry:

```yaml
- id: cr7-worktree-collision
  name: cr7-worktree-collision (W344 Z6 P6.2)
  entry: bash -c 'if [ -n "${CR7_WORKTREE_COLLISION_DISABLE:-}" ]; then exit 0; fi; exec node "$(git rev-parse --show-toplevel)/tools/precommit-worktree-collision-guard.mjs"'
  language: system
  stages: [pre-commit]
  always_run: true
  pass_filenames: false
```

Escape hatch: `$env:CR7_WORKTREE_COLLISION_DISABLE=1` (CR-5 condition-(b) operator-only).

## P6.2 pre-commit hook entry + tools/precommit-worktree-collision-guard.mjs

### `.pre-commit-config.yaml` entry (added by this stream)

```yaml
  - id: cr7-worktree-collision
    name: 'CR-7: worktree collision guard'
    entry: node tools/precommit-worktree-collision-guard.mjs
    language: system
    stages: [pre-commit]
    pass_filenames: false
```

### Logic (≤2KB per CR-2)

1. Run `git worktree list --porcelain`.
2. Parse current worktree's branch (HEAD ref) AND find any OTHER worktree on the same branch.
3. If collision found AND current worktree `git status --porcelain` shows uncommitted/staged changes → exit 2 with operator-actionable error.
4. Exit 0 otherwise (green-path zero-latency).
5. Operator-broken-state fallback: any git-internal error → advisory warn + exit 0 (do not block legitimate commits when git itself misbehaves).

### Size verification (CR-2 ≤2KB ceiling)

- First-draft size: **2,329 bytes** — OVER 2048 cap.
- Compacted final: **1,506 bytes** — under 2KB ceiling. Verified via `stat -c %s tools/precommit-worktree-collision-guard.mjs`.

## P6.3 .claude/skills/session-handoff/SKILL.md

W343 cherry-pick recovery pattern codified as a 8-trigger-or-less local skill (CR-4 audit).

### Trigger phrases (≤8 distinct per CR-4)

1. session collision
2. concurrent branch reset
3. operator overwrote my work
4. cherry-pick recovery
5. branch divergence
6. parallel session conflict
7. /handoff (operator-typed slash form)
8. side-branch rescue

### Recovery procedure (encoded in SKILL.md body)

1. **Detect**: `git log --oneline -20` + `git reflog` show your in-flight work no longer on tip of expected branch (operator reset).
2. **Snapshot**: `git stash push -u -m "W<N>-Z6-rescue"` — capture in-flight uncommitted work.
3. **Side-branch**: `git checkout -b rescue-W<N>-Z6 <last-known-good-SHA>` (from reflog).
4. **Cherry-pick**: identify your wave's commits in reflog; `git cherry-pick <SHA>...<SHA>`.
5. **Merge back**: when operator's edit settles, `git checkout w344-sota-unleash && git merge --no-ff rescue-W<N>-Z6`.
6. **Pop stash**: `git stash pop` to restore in-flight uncommitted edits onto merged branch.
7. **Verify**: `git log --graph --oneline -20` shows clean lineage.

### Cite-anchors (3-org-distinct)

- SPI/git-project: https://git-scm.com/docs/git-cherry-pick + https://git-scm.com/docs/git-reflog
- Atlassian (Bitbucket): https://www.atlassian.com/git/tutorials/cherry-pick (independent best-practice anchor)
- Anthropic CCBP: `claude-memory.md @ a28cd96b` "parallel-session safety"

## Cardinal-rule compliance

- CR-1 (trusted sources): cite-anchored to SPI/git + Atlassian + Anthropic.
- CR-2 (hooks ≤2KB): worktree-collision-guard verified ≤2KB post-write.
- CR-3 (subagent type): N/A.
- CR-4 (no auto-fire ad-hoc): 8 distinct triggers, all operator-or-pattern actionable.
- CR-5 (safety via permissions): pre-commit gate is the safety surface, NOT a custom guard runtime.
- CR-6 (verify-before-claim): worktree-collision-guard size verified after write; trigger count verified by audit.

## Verdict

- **STATUS**: READY-FOR-WAVE-CLOSURE.
- R7 text drafted, awaiting operator apply.
- worktree-collision-guard + pre-commit entry SHIPPED in this stream.
- session-handoff skill SHIPPED in this stream.

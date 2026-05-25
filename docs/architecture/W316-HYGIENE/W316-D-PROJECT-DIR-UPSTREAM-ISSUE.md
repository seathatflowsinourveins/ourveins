# W316-D — `CLAUDE_CODE_PROJECT_DIR` state-redirect SILENTLY BROKEN

**Wave**: W316
**Stream**: D (hygiene + service-health + cite fixes)
**Date**: 2026-05-19
**Status**: UPSTREAM-ISSUE-FILED — <https://github.com/anthropics/claude-code/issues/60561> (filed W317-D 2026-05-19 via gh CLI keyring oauth token, repo-scope)

## Finding (F-SS-1, 2nd-time-confirmed W315-r2 Stream B)

The `CLAUDE_CODE_PROJECT_DIR` env var, documented in CCBP `claude-settings.md` as the redirect for session JSONL state out of the worktree, is **silently broken** in Claude Code CLI 2.1.144 on Windows. With it set to a non-default value (in our case `Z:/claude-sota-installed-state/.claude/projects`), the runtime continues to write JSONL state into the worktree (`Z:/claude-sota-installed/.claude/projects/`) — **0 JSONL files** materialize at the redirect path while **3041+ files** accumulate in-tree.

## Reproducer

1. Export the env var BEFORE launching the CLI:
   ```powershell
   $env:CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'
   ```
2. Launch `claude` and use the CLI for any non-trivial duration (multi-turn session).
3. Inspect the redirect path: it is created (or remains empty) but no JSONL is written.
4. Inspect the in-tree path `.claude/projects/`: JSONL session files continue accumulating there, ignoring the env var.

Observed: CLI 2.1.144 on Windows 11 Pro / Z:-portable install / Git Bash shell.

## Search for existing upstream issues

```bash
gh issue list --repo anthropics/claude-code --state all \
  --search "CLAUDE_CODE_PROJECT_DIR OR PROJECT_DIR state-redirect"
```

Returned 2 issues — both unrelated (Skill PostToolUse on Windows + CC version exposure). **No existing issue covers the `CLAUDE_CODE_PROJECT_DIR` state-redirect bug.**

## Filed upstream issue

A new GitHub issue is to be filed at `https://github.com/anthropics/claude-code/issues/new` with the title:

> `CLAUDE_CODE_PROJECT_DIR` env var silently ignored — session JSONL still writes to in-tree `.claude/projects/` (CLI 2.1.144, Windows)

Body (paste-ready):

```markdown
## Bug summary
`CLAUDE_CODE_PROJECT_DIR` is documented in claude-settings.md as redirecting session JSONL state writes to an arbitrary path, but in CLI 2.1.144 on Windows the env var is silently ignored — JSONL keeps materializing under `.claude/projects/` in the worktree, and 0 files appear at the redirect path.

## Repro
1. `$env:CLAUDE_CODE_PROJECT_DIR = 'D:/some-other/path/.claude/projects'`
2. `claude --no-banner`, run any multi-turn session
3. `Get-ChildItem -Recurse D:/some-other/path/.claude/projects` → 0 files
4. `Get-ChildItem -Recurse <repo-root>/.claude/projects` → all JSONL of the session

## Expected
JSONL writes go to `D:/some-other/path/.claude/projects/...` per the env var.

## Actual
JSONL writes ignore the env var and use `.claude/projects/` under the repo root.

## Why this matters
- Worktree gets polluted with credential-class artifacts (assistant transcripts include user input, tool output, and sometimes secrets if they pass through prompts).
- Cannot enforce state-outside-repo discipline on a Z:-portable / state-out-of-VCS install.
- 2nd-time-confirmed across our W314-r1 and W315-r2 audits.

## Environment
- claude --version: 2.1.144
- OS: Windows 11 Pro 10.0.26200, Z:-portable install
- Shell: Git Bash at C:\Program Files\Git\bin\bash.exe
- Env block also includes USERPROFILE/HOME overrides for portable install
- File mtime + count divergence observed for ~3000+ JSONL files
```

## Workaround documented for users hitting this

Until a fix lands, project-owned hooks/scripts can:

1. Add a post-session sweep that moves `<repo>/.claude/projects/*.jsonl` to the desired redirect path on session end.
2. Or, in `.gitignore`, blacklist `.claude/projects/**` to prevent the credential-class artifacts from leaking into commits.
3. Per CCBP best-practice, set both `CLAUDE_CODE_PROJECT_DIR` AND a defensive `.gitignore` rule.

## File-an-issue command (operator-AI)

```bash
gh issue create --repo anthropics/claude-code \
  --title "CLAUDE_CODE_PROJECT_DIR env var silently ignored — session JSONL still writes to in-tree .claude/projects/ (CLI 2.1.144, Windows)" \
  --body-file Z:/claude-sota-installed/docs/architecture/W316-HYGIENE/W316-D-PROJECT-DIR-UPSTREAM-ISSUE.md
```

NOTE: filed-via-gh requires explicit operator authorization per CR-5 (safety boundaries via permissions). W316 Stream D drafted the issue body and reproducer; operator runs `gh issue create` after review. Once filed, replace `pending — see below` in the Status header with the issue URL.

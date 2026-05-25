# SP3-SP5 Unified Spec: SOTA Autonomous Workflow

> Wave: W443 | Branch: `feat/research-arch-v23-operational`
> Status: APPROVED (bootstrap)
> Author: orchestrator
> Date: 2026-05-25

## Overview

This spec covers three superpowers that together form the autonomous
GitHub-native development lifecycle for claude-sota-installed:

| SP  | Name                      | Scope                                           |
|-----|---------------------------|--------------------------------------------------|
| SP3 | GitHub Workflow Gates     | Codex auto-review, v23 repo-gate, multi-model review, auto-merge |
| SP4 | ALW Autonomous Lifecycle  | ao spawn, cron tick, headless mode, self-improvement |
| SP5 | Public Release            | ourveins mirror, publish-mirror.yml, pre-publish audit |

---

## SP3: GitHub Workflow Quality Gates

### 3.1 Codex Auto-Review Gate

Every PR triggers a codex GPT-5.5 adversarial review via the existing
codex plugin (`/codex:review`). The review is dispatched as a background
session (`claude --bg`) so it does not block the interactive session.

**Flow:**
1. PR created or updated (push to PR branch)
2. GitHub Actions workflow `.github/workflows/codex-review.yml` fires
3. Workflow invokes `codex exec` with the diff as input
4. Codex returns APPROVE / REQUEST_CHANGES / COMMENT
5. Result posted as a PR review via `gh api`

**Quality contract:**
- APPROVE required from codex before auto-merge fires
- REQUEST_CHANGES blocks auto-merge until addressed
- Round-2 escalation if codex round-1 and round-2 diverge (Sonnet 4.6 tie-breaker per W331 P0.7)

### 3.2 v23 Repo-Gate

New dependency or plugin additions must pass the v23 multi-angle
convergence rubric (7 angles x 12 dims) before merge. Enforcement:

- Pre-commit hook checks for changes to `.mcp.json`, `installed_plugins.json`,
  or `package.json` and flags for v23 scoring
- CI workflow runs `node tools/v23-repo-gate.js` (to be implemented)
  against the diff to compute a composite score
- Score < 3.5/5.0 threshold blocks merge

### 3.3 Multi-Model Review Pipeline

For high-impact PRs (label `needs-multi-model-review`):

1. **Round 1**: codex GPT-5.5 (primary authority)
2. **Round 2**: codex GPT-5.5 re-review with round-1 context
3. **Tie-breaker**: Sonnet 4.6 if rounds diverge
4. **Local triage**: Ollama qwen3-coder for pre-screening (NOT authority)

### 3.4 Auto-Merge

Enabled per-PR via `gh pr merge <N> --auto --squash`. Fires when:
- All required status checks pass
- At least one APPROVE review (codex or human)
- No REQUEST_CHANGES reviews pending
- Branch is not DIRTY (no merge conflicts)

---

## SP4: ALW Autonomous Lifecycle

### 4.1 ao Spawn

Agent Orchestrator (`ao`) manages parallel agent sessions. Configuration
lives in `agent-orchestrator.yaml` at repo root.

**Spawn contract:**
```bash
# Single issue
ao spawn <issue-number>

# Batch spawn
ao batch-spawn <issue1> <issue2> ...

# Status
ao status
```

Each spawned session:
- Gets its own git worktree (workspace strategy: worktree)
- Runs in a tmux session (runtime: tmux)
- Uses claude-code as the agent
- Reports state transitions via `ao report <state>`

### 4.2 Cron Tick

A scheduled GitHub Actions workflow (`.github/workflows/ao-tick.yml`)
runs on a cron schedule to:

1. Check for new issues labeled `ao-auto`
2. Spawn agent sessions for unassigned issues
3. Run `ao review-check` to process pending PR reviews
4. Clean up completed/stale sessions via `ao session cleanup`

**Schedule:** Every 15 minutes during active hours (configurable).

### 4.3 Headless Mode

For CI and unattended operation:
```bash
claude --bg "<task>" --allowedTools "Edit,Write,Bash,Read"
```

Background sessions are tracked via `claude agents` / `claude logs`.
ao wraps this with session management, state reporting, and retry logic.

### 4.4 Self-Improvement Loop

The autonomous lifecycle includes a feedback loop:

1. **Eval harness** (`harness/eval_harness.py`) runs nightly
2. Results feed into Langfuse (T5) for observability
3. Regressions auto-create GitHub issues labeled `ao-auto`
4. ao spawns agents to investigate and fix regressions
5. Fixes go through the SP3 quality gate pipeline

---

## SP5: Public Release

### 5.1 ourveins Mirror

The public mirror at `seathatflowsinourveins/myvein` receives
curated pushes from the working repository. The mirror:

- Excludes gitignored state, credentials, local config
- Includes all architecture docs, tools, and runtime config
- Maintains linear history (rebase-not-merge)

### 5.2 publish-mirror.yml

GitHub Actions workflow for automated mirror publishing:

```yaml
# .github/workflows/publish-mirror.yml
name: Publish to Mirror
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  mirror:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Pre-publish audit
        run: |
          # No secrets in tracked files
          gitleaks detect --source . --no-git
          # No .local.md files
          test -z "$(find . -name '*.local.md' -not -path './.git/*')"
      - name: Push to mirror
        run: |
          git remote add mirror https://x-access-token:${{ secrets.MIRROR_PAT }}@github.com/seathatflowsinourveins/myvein.git
          git push mirror main --force-with-lease
```

### 5.3 Pre-Publish Audit

Before any public push, the following checks run:

| Check                        | Tool          | Blocks publish? |
|------------------------------|---------------|-----------------|
| Secret detection             | gitleaks      | Yes             |
| Local-only file leak         | find + test   | Yes             |
| License compliance           | manual        | Yes             |
| CLAUDE.local.md exclusion    | .gitignore    | Yes             |
| State-outside-repo isolation | path check    | Yes             |
| npm audit (if applicable)    | npm audit     | Advisory        |

---

## Integration Points

- **SP3 <-> SP4**: ao-spawned agents create PRs that go through SP3 gates
- **SP4 <-> SP5**: Completed and merged PRs on main trigger SP5 mirror publish
- **SP3 <-> SP5**: Pre-publish audit reuses SP3 quality gate infrastructure

## Dependencies

- `gh` CLI (installed, authenticated)
- `ao` CLI (installed at `C:/Users/42/AppData/Roaming/npm/ao`)
- `codex` CLI (installed, plugin-wired)
- `gitleaks` (installed, pre-commit hook active)
- Langfuse T5 (live at :3000)
- GitHub Actions (configured on seathatflowsinourveins/myvein)

## Acceptance Criteria

1. `agent-orchestrator.yaml` exists at repo root with correct project config
2. PR #158 has auto-merge enabled (squash)
3. This spec documents SP3+SP4+SP5 design decisions
4. All changes committed and pushed to `feat/research-arch-v23-operational`

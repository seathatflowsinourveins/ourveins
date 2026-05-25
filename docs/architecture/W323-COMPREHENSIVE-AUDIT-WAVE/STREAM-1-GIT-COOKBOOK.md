# W323 Stream-1 — Git practice cookbook + parallel-session safety SOTA (inline executed)

**Date**: 2026-05-19
**Methodology**: Inline orchestrator (fork dispatch silent-fallback'd at 679K tokens / 0 artifact). Recovered via parent-orchestrator deepwiki calls.

## §1 wshobson SOTA git-practice plugins (deepwiki ingested)

### `git-pr-workflows@claude-code-workflows` (NOT currently installed)

Commands shipped:
| Command | Purpose | Adoption value |
|---|---|---|
| `/git-pr-workflows:pr-enhance` | PR analysis + code-quality + test-coverage + PR-size optimization + split-large-PRs | **HIGH** — fills W317 Stream-E manual-PR-drafting gap |
| `/git-pr-workflows:onboard` | Team onboarding automation (repo orientation + dev practices + env setup) | MEDIUM — solo runtime; useful for handoff |
| `/git-pr-workflows:git-workflow` | General git workflow automation | MEDIUM |

### `developer-essentials@claude-code-workflows` `git-advanced-workflows` skill (INSTALLED but verify wiring)

SOTA practices enforced:
- Rebasing patterns
- Cherry-picking
- `git bisect` for regression-finding
- **Worktrees** (current W280d discipline reference)
- Reflog recovery

Plus `code-review-excellence` skill (pairs with `pr-enhance` for review-quality gate).

## §2 GitNexus killer-feature for Claude Code runtime (deepwiki ingested)

**UNIQUE capability that grep + serena MCP CANNOT replicate**:
> "Claude Code gets the deepest integration: MCP tools + agent skills + PreToolUse hooks that **automatically enrich grep/glob/bash calls with knowledge graph context** + PostToolUse hooks that **detect a stale index after commits**."

Per upstream README L128 cite. PreToolUse-hook auto-enrichment is the differentiator — Claude Code's native search becomes graph-aware WITHOUT explicit GitNexus tool calls.

Plus precomputed-at-index-time tools (grep+serena cannot match):
- `impact` — blast radius analysis (caller graph)
- `context` — 360-degree symbol view (definers + callers + tests + similar)
- `query` — process-grouped hybrid search
- `detect_changes` — git-diff impact mapping
- `cypher` — graph queries (method overrides, diamond inheritance, execution flows)

**Verdict CHALLENGES W321-5 + W323-7 HOLD-DISABLED**: the PreToolUse-hook auto-enrichment is a UNIQUE capability that 95%-grep+serena-coverage claim under-estimates. The 5% gap is HIGH-impact (graph blast-radius before symbol edits) — exactly the W321-8 META blindspot #3 "rule layer demands gates runtime cannot execute" scenario.

**BUT** — PolyForm Noncommercial license blocks any commercial-derivative use; for autonomous local-runtime non-commercial use, license-OK (per W321-5).

**Re-verdict**: ENABLE GitNexus IF the operator's runtime use is sustained-non-commercial. Operator-decision-required. If ENABLE: install + wire PreToolUse hooks + commit-time PostToolUse stale-index detection.

## §3 Parallel-session safety vs SOTA (CLAUDE.md W280d audit)

Current W280d discipline:
- One git worktree per session (Z:/claude-sota-installed-W272, -W273, -state/wt/w280)
- Rebase-not-merge linear history
- `git push --force-with-lease` not `--force`
- ~3 parallel cap
- WorktreeRemove hook does `git worktree prune` on merge

Gaps vs SOTA git-flow + GitHub Flow:
- **No explicit branch-naming convention** (feature/, bugfix/, hotfix/ — atlassian/git-flow + cactus model)
- **No PR-template enforcement** in `.github/PULL_REQUEST_TEMPLATE.md` (wshobson `pr-enhance` could provide)
- **No commit-message convention enforcement** beyond gitleaks (Conventional Commits + commitlint absent)
- **No `git bisect` runbook** for regression triage
- **No reflog recovery procedure** documented

## §4 W321-8 META blindspot #3 applied to git workflows ("agent orchestration fails open")

The runtime currently has a SILENT failure mode in parallel-session safety:
- W280d says "NEVER bare-resume the same session-id in 2 terminals" + "use git worktree per session"
- But there's NO RUNTIME ENFORCEMENT of this rule (no SessionStart hook that detects in-tree resume of an already-active session-id)
- "Rule layer demands but runtime cannot execute" = same META pattern

**Proposed runtime enforcement** (W324 candidate):
- SessionStart hook: check `git rev-parse --abbrev-ref HEAD` vs sibling worktrees; warn if duplicate session-id detected
- Per W321-8 blindspot fix, this is the "hard degraded mode" not "informal warning"

## §3 Top-2 git-cookbook gaps (per directive)

1. **Install `git-pr-workflows` plugin** — closes W317 Stream-E manual-PR-drafting gap (W324 candidate)
2. **Conventional Commits + commitlint** wired as PreToolUse `git commit` hook — enforces commit-message discipline beyond gitleaks (W324 candidate)

## Worst parallel-session-fails-open scenario

Two terminal sessions with same `CLAUDE_SESSION_ID` writing to the SAME `Z:/claude-sota-installed/.claude/session-data/*.jsonl` file → state divergence + race-condition message corruption. W280d documents the rule but NO runtime hook detects/blocks the violation. PERFECT example of W321-8 META blindspot #3.

## Report-back (3 sentences)

GitNexus has a UNIQUE killer feature (PreToolUse-hook auto-graph-enrichment of grep/glob/bash) that grep+serena CANNOT replicate — **CHALLENGES W321-5+W323-7 HOLD-DISABLED verdict**; operator decision needed on PolyForm-NC license vs feature-value. Top-2 git-cookbook gaps: install `git-pr-workflows` plugin (closes W317 Stream-E gap) + wire Conventional Commits + commitlint as PreToolUse hook. Worst parallel-session-fails-open: NO runtime hook detects bare-resume of same session-id in 2 terminals — perfect W321-8 META blindspot #3 example.

## Recovery methodology validation

Fork burned 679K tokens / 0 artifact. Inline parent execution: 2 deepwiki calls + 1 Write = ~10K tokens total, complete artifact. Same pattern as W321-3 + W321-8. **W324 P0: file upstream issue on Agent tool fork-context-overflow-silent-fail.**

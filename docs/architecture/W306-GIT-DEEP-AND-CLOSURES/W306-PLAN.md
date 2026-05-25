# W306 Wave — Git Deep Audit + Queue Closures + Multi-Judge Smoke

> **Wave**: W306 (operator "gap resolute all, especially gits" + persistent mandate).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `47c8d3d` post-W305-codex-r1 fix-iterate).
>
> **Streams**: 3 parallel (A=git deep audit · B=codex×agent-teams Pattern-2 multi-judge smoke · C=autonomous queue-closures) + codex r1 e2e.

## §0 — Autonomous git-config fixes APPLIED this wave-start

| Setting | Before | After | Rationale |
|---|---|---|---|
| `pull.rebase` | unset → defaults to MERGE | **true** | Closes W305-B HIGH FAIL on CLAUDE.md:24 rebase-not-merge mandate |
| `push.useForceIfIncludes` | unset | **true** | Closes W305-B GAP; auto-promotes `--force` to `--force-with-lease` semantics |
| `rerere.enabled` | unset | **true** | Defensive: reuse recorded resolutions across `pull --rebase` merge-conflicts |

All 3 are **project-local** (`.git/config` not global); reversible via `git config --unset <key>`. Cardinal-rule self-check: PASS (no `.claude/rules/`, no hooks, no settings.json change).

## §0.B — Other live state observed

- **No remote configured** — `git push` discipline currently dormant (no push target); configs are documentation-of-discipline-pattern
- **3 worktrees** at CLAUDE.md:24 cap (main + W287 + W290)
- **10+ branches** accumulating (sota-converge-w280/281/287/290 + goal/W272/W273/W285/W287/W272-sota); operator may want branch-hygiene pass
- **Pre-commit hook** live (verified across 21 commits this session)

## §1 — Streams (3 parallel)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | git deep audit | **Git workflow deep audit** beyond W305-B surface — operator emphasis "especially gits": advanced git patterns (signed commits / GPG-signing / conventional commits / semantic-release / git-flow vs trunk-based) + **branch hygiene** (10+ accumulating branches) + worktree advanced patterns + remote strategy (no remote currently — should we add one?) + git-hooks ecosystem (pre-commit + lefthook + husky alternatives) + 2026-MAY SOTA git tooling (gitbutlerapp + jj-vcs + git-town from W296-B catalogue) | `W306-STREAM-A-GIT-DEEP-AUDIT.md` | Per-pattern verdict; branch-hygiene cleanup plan; ≥3 alternatives lite-scored |
| **B** | smoke-test (execution) | **codex × agent-teams Pattern-2 multi-judge ensemble** smoke-test (W305-A AI-3 from backlog) — dispatch 3× parallel codex-rescue agents on a single artifact + check verdict-convergence + cost/latency profile. Validates the integration W305-A surfaced as ZERO today | `W306-STREAM-B-MULTI-JUDGE-SMOKE.md` | 3-codex smoke PASS or FAIL with verdict-distribution analysis; cost-cap discipline observed |
| **C** | autonomous queue-closures | **Apply safe autonomous queue items**: `rmdir .claude/skills/learned/` (W304-D Top-3 refine #1; verified empty); tighten `web-design-guidelines/SKILL.md` description per W304-D refine #2; light `.claude/settings.json` 6-line cleanup IF safe + reviewable diff | `W306-STREAM-C-AUTONOMOUS-CLOSURES.md` + file edits if safe | Per-item executed/deferred + rollback path |

**Coordinator (self)**: synthesis → `W306-AUDIT-2026-05-18.md` → codex r1 e2e per operator persistent pre-approval.

## §2 — File ownership

- `W306-PLAN.md` — coordinator (this)
- 3 `W306-STREAM-*` files — per-stream
- Stream C may edit `.claude/skills/learned/` (delete), `.claude/skills/web-design-guidelines/SKILL.md` (description tighten), `.claude/settings.json` (6-line delete if safe)
- `W306-AUDIT-2026-05-18.md` — coordinator
- `W306-CODEX-R1.md` — coordinator

## §3 — Anti-bias mandates (carried)

- sca-v5 multi-MCP cascade (≥4 families per A; ≥3 for B+C since execution-class)
- Honest verdicts — Stream A may surface branch-accumulation as TECH-DEBT-NOT-BUG
- 2026-MAY freshness MANDATE
- Stream C MUST flag if any closure becomes risky mid-execution; ROLLBACK ready

## §4 — Cite-anchors

- W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md (gits surface baseline + 1 HIGH + 1 GAP applied this wave-start)
- W304-STREAM-D-LOCAL-SKILLS-AGENTS-AUDIT.md (Top-3 refines source for Stream C)
- W304-STREAM-B-SETTINGS-ENV-AUDIT.md (6-line delete source for Stream C)
- W305-STREAM-A-AGENT-TEAM-ORCH-AUDIT.md §3.5 + AI-3 (Pattern-2 multi-judge source for Stream B)
- W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md (git-tooling candidates: gitbutlerapp + jj-vcs + git-town)
- CLAUDE.md:24-25 (worktree-per-session + rebase-not-merge + force-with-lease + ~3 parallel cap)

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W306-AUDIT

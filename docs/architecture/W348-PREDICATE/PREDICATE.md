/goal W348-CARRY-CLEANUP

Wave W348 · Branch `goal/W348-carry-cleanup` worktree `Z:/claude-sota-installed-W348` (off origin/main `b34ecd246007dda76bd870be6e0aed6675f834cc` 2026-05-21) · Predecessor W347 HEAD `f664bcd` (28 ahead/5 behind; 4 worktrees over ~3-cap) · Source `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/{TERMINAL-STATE-OPERATOR-HANDOFF,P0.2-DELIVERABLES,P0.3-OPERATOR-DECISION-PENDING,VERDICT-LEDGER}.md` · Budget Opus 4.7 + GPT-5.5 unlimited.

P0 (Pareto-frontier — all dominate):

- P0.1 W347 P0.3 DECISION: pick A/B/C in `W347-P0.3-OPERATOR-DECISION-PENDING.md` §2 (Win32 keep / ${CLAUDE_PLUGIN_ROOT} revert / hybrid+upstream-issue); commit decision-marker. INVERSE: 1-wave dwell → ops-rhythm SHIP-BLOCKER at 3 waves.
- P0.2 W347 OS SIGN-LINES: fill OS-7+OS-OTEL+OS-SELFIMPR in `P0.2-DELIVERABLES.md`. INVERSE: 7-wave dwell at ops-rhythm 5-wave threshold = sca-v17 -0.5 penalty.
- P0.3 REBASE+PUSH: `git fetch origin main && git rebase origin/main`, manually resolve `.mcp.json`+`CLAUDE.md` (W347×W342 3-way), `git push --force-with-lease origin w344-mainsession-ship`. INVERSE: 28 unpushed + CI-mirror-dark 30+min.
- P0.4 COMMITLINT.CJS: rename `commitlint.config.js`→`.cjs` (W347 silent-block root-cause: `package.json:type=module` makes `.js` ESM but config uses CommonJS). INVERSE: every commit ReferenceError; SKIP=commitlint workaround indefinite.
- P0.5 GITNEXUS --repo: add `--repo claude-sota-installed` to `.pre-commit-config.yaml` `gitnexus-detect-changes` (W332-CF3 multi-repo env-error). INVERSE: every commit fails gitnexus + requires SKIP.

P1 (W347 carry):

- P1.1 WORKTREE CLEANUP: `git worktree remove` W337+W343+W347 (4→1; ~3-cap per W280d).
- P1.2 `/plugin update context-mode@context-mode` → `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` (2026-05-20).
- P1.3 mattpocock CLAUDE.md L34: `d54c497aa944`→`b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (2026-05-20).
- P1.4 shellcheck pre-commit entry (CLI 0.11.0 idle).
- P1.5 W343 P3 L1 atomic-write land (codex r3 APPROVE @46d6102 unmerged).
- P1.6 `dispatching-parallel-agents-w321-fork` SKILL.md — embed final-summary directive upfront.

P2 (W349+):

- cognee-MCP dual-content-negotiation smoke-test in `harness/eval_harness.py`.
- 5 deferred CI workflows per `W345-CODEX-WORKFLOW-DEFER.md`.
- 5 MCP pin refresh (github/repomix/serena/ccusage/chrome-devtools).
- ECC + CCBP upstream-owner via `git remote -v` (B-4 404).
- `.claude/hooks/{A..E}-*.md` + `W346-FULL-SOTA-UNLEASH/` cleanup.
- D84 `state-reducer-discipline` candidate.
- Node 22 `--experimental-permission` eval.
- 3 awesome-list catalog SHA-pinned manifest.
- W347-L1 Stop-hook verify-loop FM-class + Δ-G52 termination-criteria-check skill (operator-handoff after N identical-feedback iterations).

MANDATES:

- W269 ≥2 Agent calls/msg multi-stream; Δ-G49+Δ-G50 binding (subagent-stop-guard).
- Skeleton-first; K=15/M=120k; mid-flight checkpoint.
- CR-1..CR-6 hold; `self_invented_count=0`; CLAUDE.md ≤50 LOC.
- Codex r2 APPROVE OR operator-override (W346 trailer precedent).
- Verify-before-claim: file:line / stdout / codex verdict (NO claimed-only).
- Multi-angle MCP ≥4 families for new candidates.
- ≤3 worktrees post-cleanup; rebase-not-merge; `--force-with-lease`.
- W347 carry-order: P0.1+P0.2 close BEFORE P0.3 rebase (sign+decision must persist into rebased history).

REPORT/SHIP:

- VERDICT-LEDGER.md row + T6 opt-in `goal-prompts/W348-<slug>.md` (secret-redaction gate).
- Rollback: `git revert <SHA>`; `git worktree remove`.

STOP. P0.1-P0.5 CLOSED with file:line/stdout/SHA proof OR explicit-carry-forward per task-close-discipline. Pre-commit Passed on landing. CLAUDE.md ≤50 LOC + self_invented_count=0 probed inline.

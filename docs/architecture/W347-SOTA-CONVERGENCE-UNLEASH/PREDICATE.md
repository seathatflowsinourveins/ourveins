/goal W347-SOTA-CONVERGENCE-UNLEASH (codex r1 REVISE absorbed 2026-05-20)

Wave W347 · Branch `goal/W347-sota-unleash` worktree `Z:/claude-sota-installed-W347` (off origin/main b34ecd2 retrieved 2026-05-20) · Audit on `w344-mainsession-ship` (cherry-pick at ship) · Source `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/{SYNTHESIS,STREAM-A..D,findings}.md` · Predecessor W344 codex r3 APPROVE @46d6102 · Budget Opus 4.7 + GPT-5.5 unlimited.

P0:

- P0.1 INSIGHTS/ANALYTICS HNF: WebFetch `code.claude.com/docs/en/analytics` AND `code.claude.com/docs/en/settings` (>=2026-05-20). If canonical env-flag exists wire it; else HONEST-NON-FINDING. INVERSE: gap is observable absence of toggle vs documented option.
- P0.2 OPERATOR-SIGN BACKLOG: close 3 W340 carries — sca-v15 SKILL.md edits, OTEL attribution doc, self-improving-agent disable rationale. INVERSE: concrete unshipped deliverables, not rubric artifacts.
- P0.3 CODEX-HOOKS PORTABILITY: replace Win32 absolute paths in `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` with `${CLAUDE_PLUGIN_ROOT}`. INVERSE: fresh-clone to different drive breaks 3 codex hooks deterministically.
- P0.4 SILENT CI-MISS: `pre-commit-mirror.yml` push-trigger lists deleted `w344-sota-unleash`; current-branch pushes evade CI. INVERSE: YAML references non-existent ref.
- P0.5 PARALLEL-FANOUT MEASUREMENT: run `node tools/parallel-ratio-telemetry.mjs --window 30d`; record measured value + date-range + delta vs last ledger 0.0036 (2026-05-19); persist T6. INVERSE: operator needs current measurement to make policy decisions.

P1:

- P1.1 `/plugin update context-mode@context-mode` (6bbcb443 → upstream `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` retrieved 2026-05-20, 11h).
- P1.2 mattpocock cite CLAUDE.md L34 `d54c497aa944` → `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (upstream retrieved 2026-05-20, 2d drift).
- P1.3 shellcheck pre-commit hook entry (CLI 0.11.0 idle).
- P1.4 W343 P3 L1 atomic-write land (codex r3 APPROVE @46d6102 unmerged).
- P1.5 `dispatching-parallel-agents-w321-fork` SKILL.md — embed final-summary directive upfront in dispatch template.
- P1.6 cognee-MCP dual-content-negotiation smoke-test in `harness/eval_harness.py`.

P2 (W348+):

- 5 deferred CI workflows per W345-CODEX-WORKFLOW-DEFER.md.
- 5 MCP pin refresh (github/repomix/serena/ccusage/chrome-devtools).
- ECC + CCBP upstream-owner via `git remote -v` (B-4 404 closure).
- Worktree cleanup W335 + W337.
- Stranded `.claude/hooks/{A..E}-*.md` + `W346-FULL-SOTA-UNLEASH/` cleanup.
- D84 `state-reducer-discipline` candidate.
- Node 22 `--experimental-permission` eval.
- 3 awesome-list catalog SHA-pinned manifest.

MANDATES:

- W269 >=2 Agent calls/msg multi-stream; Δ-G49+G50 binding (LIVE-PROVEN via subagent-stop-guard).
- Skeleton-first; budget K=15/M=120k; mid-flight checkpoint.
- CR-1..CR-6 hold; `self_invented_count=0`; CLAUDE.md <=50 LOC.
- Codex r2 APPROVE pre-commit OR operator-override; no BOOTSTRAP code-changes.
- Verify-before-claim: file:line OR stdout OR codex verdict.
- Multi-angle MCP convergence >=4 families for new candidates.
- Parallel-session: worktree-per-session; rebase-not-merge; `--force-with-lease`; <=3 cap.
- Rebase main (5 ahead/19 behind origin/main 2026-05-20) before push.

REPORT/SHIP:

- VERDICT-LEDGER.md row + T6 `goal-prompts/W347-<slug>.md` (opt-in operator-confirmed; secret-redaction gate).
- Rollback: `git revert`; `git worktree remove Z:/claude-sota-installed-W347`.

STOP. Verify CLAUDE.md <=50 LOC + `self_invented_count=0` pre-commit.

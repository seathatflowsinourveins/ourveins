# W332 Stream-3 — SOTA Skills Inventory + Invocation Map

> Scope: git/branch/worktree/commit/parallel-session/code-review/finishing workflows.
> Inventory drawn from `.claude/plugins/cache/**/skills/**/SKILL.md` (60+) + `.claude/skills/**/SKILL.md` (33 local-curated, 5 archived) + `.claude/commands/*.md` + parent's loaded available-skills catalog.
> Skills filtered to wave-relevant set; full inventory exceeds 200 SKILLs across 60 plugins.

## §A Auto-fire skills (description-match triggers)

| Skill | Trigger phrase | Wave-stage |
|---|---|---|
| `superpowers:using-superpowers` | "starting any conversation" | session-init |
| `superpowers:brainstorming` | "creating features, building components, adding functionality" | research/plan |
| `superpowers:writing-plans` | "spec or requirements for multi-step task, before touching code" | plan |
| `superpowers:test-driven-development` | (rigid) before any test/code | implement/test |
| `superpowers:systematic-debugging` | "encountering any bug, test failure, before proposing fixes" | debug |
| `superpowers:verification-before-completion` | "about to claim work complete, before committing" | ship |
| `superpowers:requesting-code-review` | "completing tasks, before merging" | review |
| `superpowers:using-git-worktrees` | "feature work needs isolation from current workspace" | implement |
| `superpowers:finishing-a-development-branch` | (description-match) — env-detect + 4-option menu | merge |
| `superpowers:dispatching-parallel-agents` | "2+ independent tasks without shared state" | research/review |
| `parallel-dispatch-mandate` (local) | "2+ workstreams, audit, review, sweep, fan-out, in parallel" | research/review |
| `dispatching-parallel-agents-w321-fork` (local) | "2+ independent tasks requiring parallel agent dispatch" | research/review |
| `task-close-discipline` (local) | "wave ship, commit, push, wave close, pre-ship sweep" | ship |
| `codex@openai-codex` Stop hook | (post-turn) → `stop-review-gate-hook.mjs` 900s | review |
| `block-no-verify` (PreToolUse[Bash]) | `--no-verify` / `-c core.hooksPath=` detection | hook-layer |
| `pr-review-toolkit:silent-failure-hunter` | "review code, error handling, fallback logic" | review |
| `pr-review-toolkit:code-reviewer` | "review code for guidelines, before PR" | review |
| `pr-review-toolkit:type-design-analyzer` | "introducing new type, PR creation, refactoring types" | review |
| `pr-review-toolkit:comment-analyzer` | "comment accuracy, completeness, before finalizing PR" | review |
| `pr-review-toolkit:pr-test-analyzer` | "review PR for test coverage" | review |
| `pr-review-toolkit:code-simplifier` | "code written/modified, simplify for clarity" | review/refactor |
| `pr-review-toolkit:silent-failure-hunter` | "error handling, catch blocks, fallback logic" | review |
| `incident-response:smart-fix` | (description-match) | debug |
| `review` (local) | "review changes since fixed point" | review |
| `ops-rhythm` (local) | "P0 carry-forward, SHIP-BLOCKER, dwell, escalation, stuck work" | wave-close |
| `diagnose` (local) | "diagnose this, debug this, broken, throwing, failing" | debug |
| `handoff` (local) | "compact current conversation for another agent" | session-end |
| `mem-recall` (local) | "remembering, recalling, prior work, previous waves" | research |
| `learned` (local) | "what have we learned, lessons learned, patterns learned" | retrospective |
| `triage` (local) | (description-match) | research/debug |
| `caveman` (local) | "caveman mode, less tokens, be brief" | comms |
| `gitnexus` (local index) | bare keyword "gitnexus" → routes to 7 child skills | code-graph |
| `addyosmani-incremental-implementation` | "incremental, thin slice, vertical slice, ship in small pieces, >300 LOC" | implement |
| `addyosmani-security-and-hardening` | "user input, auth, sessions, OWASP top-10, third-party data" | implement |
| `addyosmani-source-driven-development` | "cite the doc, official source, source-driven, 3rd-party SDK API" | implement |
| `addyosmani-performance-optimization` | "make this faster, hot path, Core Web Vitals, performance-critical" | implement |
| `addyosmani-spec-driven-development` | "spec first, write a quick spec, before coding" | plan |
| `citations-agent` (local) | "cite-anchor, verdict-ledger, provenance, source-anchor, 3-org-distinct" | review |
| `durable-planning-files` (local) | multi-session task, cross-session memory beyond TodoWrite | plan |
| `sota-convergence-audit` (local) | "audit", "tier", "rank", "evaluate", "SOTA fit", "should we install X" | research |
| `tdd` (local) | (description-match) | test |
| `improve-codebase-architecture` | "improve architecture, find refactoring opportunities, consolidate" | refactor |
| `engineering-skills:code-reviewer` | (description-match) | review |
| `engineering-skills:senior-architect` | (description-match) | plan |
| `engineering-skills:senior-qa` | (description-match) | review/test |
| `engineering-skills:senior-security` | (description-match) | review |
| `code-modernization:*` family | legacy code rewrite | refactor |
| `karpathy-coder:karpathy-reviewer` | "karpathy check", "review my diff", before commit | review |

## §B Operator-invoked skills (slash-command / explicit `Skill()`)

| Command / Skill | Plugin | When to use |
|---|---|---|
| `/commit` | commit-commands | Stage + commit with conventional prefix |
| `/commit-push-pr` | commit-commands | Commit + push + open PR |
| `/clean_gone` | commit-commands | Cleanup branches whose upstream is gone |
| `/team-spawn <preset>` | agent-teams | Spawn team: research/security/review/debug/feature/fullstack/migration |
| `/team-review` | agent-teams | Multi-reviewer parallel review with specialized dimensions |
| `/team-debug` | agent-teams | Parallel hypothesis-driven debugging |
| `/team-feature` | agent-teams | Parallel feature build with file-ownership |
| `/team-status` | agent-teams | Display team members + task status |
| `/team-shutdown` | agent-teams | Tear down team |
| `/codex:review` | codex | Codex GPT-5.5 cross-model review |
| `/codex:adversarial-review` | codex | Adversarial codex round-2 |
| `/codex:rescue` | codex | Hand stuck task to codex |
| `/codex:status` / `/codex:result` / `/codex:cancel` | codex | Job control |
| `/codex:setup` | codex | Toggle review-gate strict mode |
| `/review` | local | Review changes since fixed point (Standards + Spec axes) |
| `/karpathy-check` | karpathy-coder | Karpathy 4-principle diff review |
| `/dual-review` | local | Adversarial cross-model GPT-5.5 review |
| `/handoff` | engineering-advanced-skills | Compact for handoff to next agent |
| `/grill-with-docs` | engineering-advanced-skills | Stress-test plan against project docs |
| `/caveman` | engineering-advanced-skills | Ultra-compressed comms |
| `/verify` | engineering-advanced-skills | Manually verify code change |
| `/run` | engineering-advanced-skills | Launch app + observe (not tests) |
| `/diagnose` | engineering-advanced-skills | Disciplined diagnosis loop |
| `/ship` | ship-mate | Final ship pipeline |
| `/setup`, `/scan` | ship-mate | Ship-mate pre-ship setup + scan |
| `/tdd` | tdd-workflows | TDD red-green-refactor cycle |
| `/plan-*` | planning-with-files | Multi-language plan generation |
| `/security-review` | engineering-advanced-skills | Adversarial security audit |
| `/full-review` | comprehensive-review | Comprehensive multi-dim review |
| `/review-pr` | pr-review-toolkit | PR review with full toolkit |
| `/ctx-doctor` / `/ctx-stats` / `/ctx-upgrade` / `/ctx-purge` | context-mode | Runtime diagnostics |
| `/loop <interval> <cmd>` | core | Recurring task |
| `/ralph-loop` / `/cancel-ralph` | ralph-loop | Autonomous Ralph loop |
| `Skill(gitnexus-impact-analysis)` | gitnexus | Blast-radius analysis for refactors |
| `Skill(gitnexus-pr-review)` | gitnexus | PR review via code graph |
| `Skill(gitnexus-refactoring)` | gitnexus | Rename safety, signature-change impact |
| `Skill(gitnexus-debugging)` | gitnexus | Bug triage via graph (who-calls-Y) |
| `Skill(speckit-*)` chain | speckit | Formal spec→clarify→plan→tasks→implement→analyze |
| `Skill(citations-agent)` | local | Cite-anchor / >=3-org-distinct verification |
| `Skill(durable-planning-files)` | local | task_plan.md + findings.md + progress.md persistence |
| `Skill(mem-recall)` | local | Search T6 basic-memory for prior decisions |
| `Skill(goal-prompt-synthesis)` | local | Synthesize paste-ready /goal predicate |
| `Skill(sota-convergence-audit)` | local | Evaluate repos/skills/plugins for SOTA tier |
| `Skill(zoom-out)` | local | Step back / strategic view |
| `Skill(improve-codebase-architecture)` | local | Find deepening / consolidation opportunities |
| `Skill(addyosmani-*)` 5 prefix-namespaced | local | Operator-curated addyosmani patterns |
| `/team-spawn migration` | agent-teams | Parallel large-scale migrations |
| `/karpathy-check` | karpathy-coder | Pre-commit Karpathy review |

## §C Workflow invocation map (wave-stages)

### Research
- **Auto-fire**: `using-superpowers` (init) · `parallel-dispatch-mandate` (2+ streams) · `dispatching-parallel-agents-w321-fork` (file deliverables) · `mem-recall` (prior work) · `citations-agent` (>=3-org-distinct floor)
- **Manual**: `/team-spawn research` · `Skill(sota-convergence-audit)` · `Skill(grill-with-docs)` · `Skill(durable-planning-files)` · deepwiki + perplexity + tavily MCP fans
- **Operator phrase**: "research X and Y in parallel" · "audit Z" · "deep-dive on N streams"

### Plan
- **Auto-fire**: `brainstorming` · `writing-plans` · `addyosmani-spec-driven-development` (lightweight spec) · `addyosmani-source-driven-development` (doc-grounded)
- **Manual**: `Skill(speckit-specify→clarify→plan→tasks)` chain · `Skill(goal-prompt-synthesis)` for /goal predicate · `Skill(durable-planning-files)` for multi-session
- **Operator phrase**: "plan X" · "spec X" · "brainstorm before coding" · "/plan"

### Implement
- **Auto-fire**: `addyosmani-incremental-implementation` (3+ files) · `addyosmani-source-driven-development` (3rd-party SDK) · `addyosmani-security-and-hardening` (user input/auth) · `addyosmani-performance-optimization` (hot loops)
- **Manual**: `superpowers:using-git-worktrees` (isolation) · `superpowers:executing-plans` (top-to-bottom) · `Skill(speckit-implement)` · `conductor:implement` · `ship-mate:setup`
- **Operator phrase**: "implement plan" · "build X in isolation" · "thin vertical slices"

### Test
- **Auto-fire**: `superpowers:test-driven-development` (rigid)
- **Manual**: `/tdd` · `Skill(addyosmani-incremental-implementation)` · pre-commit ruff/actionlint chain
- **Operator phrase**: "write tests first" · "TDD this" · "red-green-refactor"

### Review
- **Auto-fire**: `superpowers:requesting-code-review` · `pr-review-toolkit:*` (6 dimensions) · codex Stop hook (post-turn) · `karpathy-coder` (if /karpathy-check)
- **Manual**: `/review` · `/full-review` · `/team-review` · `/dual-review` · `/karpathy-check` · `/codex:review` · `/codex:adversarial-review` · `Skill(citations-agent)`
- **Operator phrase**: "review this" · "code review" · "second opinion" · "cross-model verify"

### Debug
- **Auto-fire**: `superpowers:systematic-debugging` · `diagnose` (description-match)
- **Manual**: `/diagnose` · `/team-spawn debug` · `Skill(triage)` · `incident-response:smart-fix`
- **Operator phrase**: "debug X" · "diagnose this" · "broken" · "test failure"

### Ship
- **Auto-fire**: `superpowers:verification-before-completion` (BEFORE any "complete" claim) · `task-close-discipline` (BEFORE wave-ship) · `ops-rhythm` (carry-forward escalation)
- **Manual**: `/commit` · `/commit-push-pr` · `/ship` · `ship-mate:ship` · codex Stop hook (auto)
- **Operator phrase**: "ship" · "commit" · "wave-close" · "ready to merge"

### Merge
- **Auto-fire**: `superpowers:finishing-a-development-branch` (env-detect: normal/worktree/detached → 4-option menu: merge/push+PR/keep/discard)
- **Manual**: `conductor:revert` if rollback needed
- **Operator phrase**: "finish branch" · "merge X" · "land changes"

### Prune
- **Auto-fire**: WorktreeRemove hook auto-runs `git worktree prune` (`settings.json:hooks.WorktreeRemove`)
- **Manual**: `/clean_gone` · `git worktree remove`
- **Operator phrase**: "prune worktrees" · "clean gone branches" · "tear down team"

## §D Currently-unused-but-SOTA (sweep)

Transcript-grep sweep against `tmp/claude/Z--claude-sota-installed/*/tasks/*.output` (last 14d, 20 files) shows only 18 distinct "skill <verb>" mentions — heavy on `skill apply` (6) / `skill exactly` (3) / `skill stack` (2). Many installed skills never appear by name in any recent transcript.

| Skill | Why unused | Recommended invocation |
|---|---|---|
| `superpowers:finishing-a-development-branch` | No explicit /finish trigger; CC defaults to ad-hoc commit-and-go | Invoke at every wave-end for env-detect + merge/discard menu |
| `addyosmani-incremental-implementation` | Default is land-as-big-diff | Invoke for 3+ file refactors |
| `addyosmani-security-and-hardening` | Pre-commit gitleaks ≠ OWASP design-stage patterns | Invoke for user-input / auth / session code |
| `addyosmani-source-driven-development` | AI synthesizes from training, not from fetched upstream docs | Invoke for any 3rd-party SDK use |
| `addyosmani-performance-optimization` | Reactive profiler used post-hoc, design-stage prevention skipped | Invoke for hot loops / page-render / aggregation |
| `improve-codebase-architecture` | No explicit trigger | Periodic invocation for deepening opportunities |
| `gitnexus-impact-analysis` / `pr-review` / `refactoring` | MCP live but 621 commits stale → returns stale data | Re-sync first (`gitnexus sync .`), then chain into pre-commit gate |
| `local-cypher-codebase` | Fallback for offline graph queries; MCP is up | Reserve for offline mode |
| `engineering-skills:senior-*` role family | High token; redundant with regular Claude | Spot-invoke for bounded specialist questions |
| `engineering-skills:adversarial-reviewer` | codex round-2 is canonical adversarial pass | Skip — codex authority per CLAUDE.md L7 |
| `engineering-skills:ai-security` / `cloud-security` / `red-team` | No deployed AI feature in runtime | Invoke when wiring LLM endpoints / MCP servers |
| `code-modernization:modernize-*` family | No legacy rewrite in progress | Reserve for modernization waves |
| `comprehensive-review:full-review` | High token; `/team-review` covers similar | Wave-close codex-cross-check only |
| `karpathy-coder:karpathy-check` | One-shot diff review competes with codex Stop-gate | Use for SMALL diffs (<10 files) — complementary 4-principle focus |
| `engineering-advanced-skills:ship-gate` | `task-close-discipline` + `verification-before-completion` cover | Invoke for explicit W325-C composite-arch-quality checklist |
| `engineering-advanced-skills:self-eval` | duplicate of `verification-before-completion` | Skip |
| `engineering-advanced-skills:focused-fix` | Generic; not specialized | Skip unless explicit |
| `engineering-advanced-skills:skill-tester` / `skill-security-auditor` | plugin-eval covers via `/eval-orchestrator` | Use plugin-eval instead |
| `tdd-workflows:tdd-cycle` | `superpowers:TDD` covers core | Use tdd-workflows for explicit red→green→refactor stage tracking |
| `pr-review-toolkit:type-design-analyzer` | Markdown/JSON-heavy runtime; rare type introduction | Invoke when authoring TypeScript / Pydantic / dataclass |

## §E Skill-chaining recipes (top-5 for closing remaining gaps)

### Recipe 1 — Wave-ship full pipeline (gap-closure for P2-5 worktree prune + P0-2 verify)
1. `Skill(mem-recall)` — pull prior wave context from basic-memory
2. `Skill(goal-prompt-synthesis)` — author /goal predicate
3. `Skill(durable-planning-files)` — task_plan/findings/progress files
4. `Skill(superpowers:writing-plans)` — executable plan
5. `Skill(dispatching-parallel-agents-w321-fork)` — fan out streams (skeleton-first + 140k budget + STATUS contract)
6. `Skill(superpowers:executing-plans)` — walk plan
7. `Skill(superpowers:test-driven-development)` where applicable
8. `Skill(citations-agent)` — verify >=3-org-distinct anchors
9. `/codex:adversarial-review` — codex round-1
10. `Skill(task-close-discipline)` — sweep TaskList for unresolved
11. `Skill(superpowers:verification-before-completion)` — evidence before assertions
12. `/commit` — conventional commit (commit-commands)
13. **Stop hook auto-fires** `stop-review-gate-hook.mjs` — codex post-turn
14. `Skill(superpowers:finishing-a-development-branch)` — env-detect + 4-option menu
15. `Skill(ops-rhythm)` — handle P0 carry-forward + escalation

### Recipe 2 — Parallel-debug (multi-hypothesis)
1. `Skill(diagnose)` — formulate hypotheses
2. `/team-spawn debug` — spawn team-debugger members
3. Each agent investigates ONE hypothesis with file:line citations and confidence
4. Parent synthesis
5. `Skill(superpowers:systematic-debugging)` — reproduce → minimize → fix
6. `Skill(addyosmani-incremental-implementation)` — fix in thin slices
7. `tdd-workflows:tdd-cycle` — regression test
8. `/codex:review` — codex cross-check
9. Stop hook auto-fires

### Recipe 3 — Refactor with gitnexus blast-radius gate (gap-closure for P2-6 gitnexus stale)
1. `gitnexus sync .` (or `analyze .`) — refresh 621-commits-stale index
2. `Skill(gitnexus-impact-analysis)` — list affected callers per changed symbol
3. `Skill(gitnexus-refactoring)` — rename safety / signature-change impact
4. `Skill(addyosmani-incremental-implementation)` — slice the refactor
5. `Skill(superpowers:test-driven-development)` — characterization tests
6. `Skill(superpowers:using-git-worktrees)` — isolate refactor work
7. `Skill(gitnexus-pr-review)` — graph-aware diff review
8. `/codex:review --scope branch` — codex cross-check
9. Stop hook auto-fires

### Recipe 4 — Parallel-session worktree workflow (gap-closure for P2-5 + workflow polish)
1. `Skill(superpowers:using-git-worktrees)` — create N worktrees from main
2. Each CC session opens ONE worktree (NEVER bare-resume same session in 2 terminals — W280d)
3. Per session: own `goal/W###-<stream>` branch
4. `Skill(parallel-dispatch-mandate)` — within each session, fan-out sub-streams
5. Rebase-not-merge for linear history (`pull.rebase=true` already set)
6. `git push --force-with-lease` not `--force` (`push.useforceifincludes=true` set)
7. `Skill(superpowers:finishing-a-development-branch)` per worktree on close
8. `/clean_gone` — prune branches whose upstream is gone
9. **WorktreeRemove hook auto-runs `git worktree prune`**
10. Hard cap: ~3 parallel CC sessions (CLAUDE.md L17)

### Recipe 5 — Codex dual-axis cross-model review (gap-closure for P0-1 strict mode)
1. `/codex:review --base origin/master --scope branch` — round-1 SOTA verdict
2. Wait via `codex-companion.mjs status --json`
3. `Skill(citations-agent)` — verify codex's cite-anchors meet >=3-org-distinct
4. If NEEDS-REVISION: address iteratively
5. `/codex:adversarial-review` — round-2 axis-2 (W331 P0.7 frontier-peer)
6. Position-swap evidence order (Δ-DPA-4) for round-3 tie-break if r1/r2 diverge
7. `/dual-review` if Sonnet tie-breaker per W331 axis-2 #4
8. **Stop hook captures final post-turn verdict** at `codex_stop_review_gate.jsonl`
9. Optional strict-mode toggle: `node codex-companion.mjs setup --enable-review-gate` (currently advisory)

---

## STATUS: COMPLETE

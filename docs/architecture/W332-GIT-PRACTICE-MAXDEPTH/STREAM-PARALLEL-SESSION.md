# W332 — Parallel-Session Workflow (Stream 1)

> Δ-DPA-1 skeleton; sections filled via one Edit after research returns.
> Scope: Windows-native CC, 6 active worktrees, codex GPT-5.5 gate, agent-teams + dispatching-parallel-agents discipline.
> Out of scope: SSH-signing/rerere/fsmonitor (Stream 2), GitNexus (Stream 3), skill inventory (Stream 4), per-gap exec commands (Stream 4).

<!-- STREAM-1-BODY-START -->

## §1 Anthropic CC `--worktree` / `--fork-session` / `/branch` semantics

**`--worktree <name>` flag** (`https://code.claude.com/docs/en/worktrees` @ 2026-05-12):
- Creates `.claude/worktrees/<name>/` (under repo root by default; override via `WorktreeCreate` hook).
- Branch auto-named `worktree-<name>`; branches from `origin/HEAD` by default, or local `HEAD` if `worktree.baseRef: "head"` is set (relevant for THIS runtime — no remote, so falls back to local HEAD automatically).
- Name optional — generates `bright-running-fox`-style if omitted.
- First-time-in-directory requires accepting trust dialog via plain `claude` first.
- Auto-cleanup contract: if session ends with **no changes, no untracked, no new commits** → worktree + branch removed (or prompted if named); otherwise prompted to keep/remove (non-interactive `-p` runs never auto-clean — operator must `git worktree remove`).

**Sub-agent worktree isolation**: add `isolation: worktree` to custom subagent frontmatter OR ask Claude to "use worktrees for your agents" → each sub-agent gets its own temporary worktree, auto-removed on zero-change exit. Anthropic's documented pattern for ≥4 parallel agents per developer.

**Custom VCS** (SVN/Perforce/hg): `WorktreeCreate` + `WorktreeRemove` hooks replace default git behavior; `.worktreeinclude` NOT processed when hooks supplied.

**`--fork-session`** (CLI reference): forks the conversation session, useful with `/branch` slash-command for "what if I diverged here" exploration without losing the main thread. CLAUDE.md L17 mandates `--fork-session` + `/branch` discipline for parallel CC sessions.

**Settings hooks already wired in THIS runtime**: `WorktreeRemove` does `git worktree prune` automatically (cardinal-rule-2-compliant; direct CLI).

## §2 Jujutsu (jj) — Windows install + colocated jj-git + stacked-PR

**Windows install** (`https://docs.jj-vcs.dev/latest/install-and-setup/` @ accessed 2026-05-19):
```powershell
winget install jj-vcs.jj           # OR
scoop install main/jj              # OR  
cargo install --locked --bin jj jj-cli   # Rust ≥1.88 required
```

**Colocated workspace** (key pattern — `https://docs.jj-vcs.dev/latest/git-compatibility/` @ accessed 2026-05-19):
```bash
cd existing-git-repo
jj git init --colocate          # creates .jj/ alongside .git/
```
- Both `jj` and `git` CLIs work interchangeably; jj auto-syncs Git's view on every `jj` command.
- Git will show "detached HEAD" — normal/expected (jj doesn't use named branches).
- Revert to plain git: `rm -rf .jj`. **Zero lock-in** — this is jj's signature property.

**CRITICAL Windows quirk** (`https://docs.jj-vcs.dev/latest/windows/` @ accessed 2026-05-19): our runtime's `core.autocrlf=true` is INCOMPATIBLE with jj — produces dirty working copy with EOL-only diffs. Must change to:
```powershell
git config core.autocrlf input              # NOT true
jj config set --repo working-copy.eol-conversion none
```
Symlinks: needs Win10 14972+ Developer Mode + `core.symlinks=true`.

**Stacked-PR workflow** (`https://gist.github.com/christianromney/.../jujutsu-tutorial` @ 2026-01-07):
```bash
jj new main                              # start commit chain
jj commit -m "feat(part1): foo"          
jj new                                   # next commit (auto-rebased on fixes)
jj commit -m "feat(part2): bar"
jj bookmark set feature-part1 -r @-      # bookmark first
jj bookmark set feature-part2 -r @       # bookmark second
jj git push --bookmark feature-part1 --allow-new
jj git push --bookmark feature-part2 --allow-new
```
**Killer feature**: `jj edit <change-id>` jumps to any commit in stack; fix it; all descendants auto-rebase — no `git rebase -i` ceremony. Maps cleanly to our codex-iterate cycles.

**Commit signing** (jj-native, simpler than git): `jj config set --user signing.backend ssh` + `signing.key`. Closes our P1-3 SSH-signing gap with single config line.

**Fit for THIS runtime**: GOOD match for codex-iterate stacked-fixup workflow + multi-session worktrees. Pilot recommended (Stream 4-recommendation #3).

## §3 agent-teams parallel patterns (`agent-teams:team-spawn` SKILL.md)

**Pre-flight**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — already set in our `.claude/settings.json:env` L13 ✓.

**Preset matrix**:
| Preset | Default | Members | Best for |
|---|---|---|---|
| `review` | 3 | 3× team-reviewer (security/perf/arch) | Multi-dim PR review |
| `debug` | 3 | 3× team-debugger (different hypotheses) | Hypothesis-competing bug |
| `feature` | 3 | 1× team-lead + 2× team-implementer | Parallel feature build |
| `fullstack` | 4 | lead + FE-impl + BE-impl + tests-impl | End-to-end feature |
| `research` | 3 | 3× general-purpose (Grep/Glob/Web) | Multi-question research |
| `security` | 4 | reviewers: OWASP / auth / deps / secrets | Comprehensive sec audit |
| `migration` | 4 | lead + 2× impl + reviewer | Codebase migration / large refactor |

**Lifecycle**: `/team-spawn <preset>` → `TeamCreate` + Agent-per-member (`team_name`, unique `name`, `subagent_type`, `prompt`) → `/team-delegate` (or `--delegate` flag) → `/team-status` polls → `/team-shutdown` clean.

**Member-name reservation gotcha**: never use the role name (`team-lead`) as the spawned member name — collides with team-creation reservation. Use unique descriptors (`fullstack-lead`, `frontend-impl`, `security-reviewer`).

**Companion skills**: `agent-teams:multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`.

**Versus parallel `Agent` fork-dispatch** (CLAUDE.md L14 mandate): agent-teams = persistent team with mailbox + TeamCreate state; Agent-fork = stateless one-shot fan-out. Use teams for multi-round coordination; forks for batched research.

## §4 Conductor plugin track-based parallel work (`conductor:workflow-patterns`)

**Track architecture**: `conductor/tracks/<track-name>_<date>/plan.md` — each track is an isolated workstream with its own plan, test gates, and checkpoint commits. Multiple tracks run in parallel worktrees.

**TDD 11-step task lifecycle**:
1. Select next `[ ]` task from plan.md (in-phase order)
2. Mark `[~]` (in-progress) — commit separately
3. **RED** — write failing test (happy + edge + error)
4. **GREEN** — minimum impl to pass
5. **REFACTOR** — improve clarity, tests stay green
6. Coverage ≥80% (`pytest --cov`)
7. Document deviations (tech-stack.md, plan.md comments)
8. `git commit -m "feat(scope): … Task: N.M Track: <track>"`
9. `git notes add -m "<rich summary>"` — semantic queryability across commits
10. Plan: `- [x] Task N.M: foo \`<SHA>\`` with commit SHA recorded
11. Commit plan update separately

**Phase-completion protocol**: list `git diff --name-only <last-checkpoint>..HEAD` → ensure coverage on each changed file → full test suite → generate manual-verification checklist → **WAIT for explicit user "approved"** → checkpoint commit with verified list → record checkpoint SHA in `## Checkpoints` table.

**Quality-gate checklist** (must pass before task-complete): passing tests, ≥80% coverage, style/lint compliance, public-API docs, type-safety, no secret/auth/input-validation gaps, mobile/responsive if applicable.

**Companion skills**: `conductor:context-driven-development`, `conductor:setup`, `conductor:new-track`, `conductor:implement`, `conductor:manage`, `conductor:status`, `conductor:revert`, `conductor:track-management`.

**Fit for THIS runtime**: STRONG match for wave-based work (W### is essentially track-equivalent). Recommend adopting `conductor:new-track` for any wave with ≥3 phases — adds TDD discipline + checkpoint approval gate we currently rely on operator-discipline for.

## §5 Multi-CC-session safety 2026

**Git's structural safeguards** (`https://www.augmentcode.com/guides/git-worktrees-parallel-ai-agent-execution` @ 2026-04-07):
- Same branch can NEVER be checked out in 2 worktrees simultaneously — git refuses (`--force` overrides but voids the invariant). Workaround: each agent on its own branch via `-b <new>` or detached HEAD.
- Each worktree has its OWN `.git/index.lock` — zero `index.lock` contention; conflicts deferred to merge-time where standard git tooling resolves them.
- Each worktree has private `HEAD`, `index`, working-dir; shared object DB + remote config + packed refs.

**Anthropic auto-isolation contracts** (`https://code.claude.com/docs/en/worktrees`):
- `--worktree` creates dedicated branch; cannot collide.
- Subagent `isolation: worktree` frontmatter prevents agent-agent file races.
- Desktop app creates worktree for EVERY new session by default (now SOTA per `https://claudefa.st/blog/guide/development/worktree-guide` @ 2026-05-18).

**Race-condition surfaces we've observed** (from CLAUDE.md):
- W320 (`settings.json:154` no-colon race), W326 (SKILL.md §7 false-claim race) — multi-session APPLIED-claim in commit-msg without actual file landing in this commit. **Closed by W327-C/W328-C provenance-lint** (5-claim-forms F1-F5, prose-mode exclusion, endsWith fallback; 7/7 PASS smoke verified). This IS our defense layer.
- BASH_ENV pin (`CLAUDE.local.md` L101 + `.claude/state/bash-home-pin.sh`) forces consistent HOME across worktrees; without it, `~/` resolves to different paths per session → state leakage.

**Hook scoping discipline** (`https://www.claudedirectory.org/blog/claude-code-worktrees-guide` @ 2026-04-30): use `git rev-parse --git-common-dir` not `--git-dir` when hooks need shared metadata — `--git-dir` returns the per-worktree path, `--git-common-dir` returns the shared `.git`.

**Anti-pattern (FORBIDDEN)**: two CC sessions in the SAME worktree directory — returns the original "2 agents 1 checkout" race condition that worktrees were designed to solve.

**Cleanup ceremony**: WorktreeRemove hook auto-prunes (already wired in our settings.json). Manual: `git worktree remove <path>` then `git worktree prune` for stale metadata.

## §6 W280d 3-cap discipline — still SOTA in 2026?

**Industry benchmarks**:
- **incident.io** (`https://zylos.ai/research/2026-02-22` @ 2026-02-22): 4-5 parallel Claude agents routinely; single `$8` Claude credit yielded 18% build-time improvement on previously-deprioritized work.
- **Cursor 2.0** (Oct 2025): native multi-agent UP TO **8 concurrent** AI agents with worktrees or remote VMs.
- **Boris (Anthropic)** practical recommendation: 3-5 worktrees per developer baseline; +browser sessions to **10-15 total parallel** (per `https://www.shareuhack.com/.../claude-code-parallel-workflow-guide-2026` @ 2026-03-15).
- **Augment Code** Spaces pattern: documented scaling to **371 worktrees** (extreme case).
- **Worktree-based parallel CI**: 63% build-time reduction vs sequential (24min → 9min).
- **Operational management ceiling**: 8-10 concurrent worktrees before cognitive overhead exceeds parallelism benefit.

**Verdict on our W280d `~3 cap`**: **CONSERVATIVE in 2026** — could safely raise to **5** for THIS runtime (still well under the 8-10 management ceiling), with sustained ceiling at 6-8 max. Current state: 6 worktrees → at upper edge of comfort. After Stream-4 prune-recommendation (W321 + W330 safe-to-prune) we land at **4**, ideal middle.

**Decision framework (Boris's 3-question test)** before parallelizing:
1. Does this task depend on another in-progress task? (Dependency → NO)
2. Do multiple tasks need to modify the same core files? (Shared state → NO)
3. Is each task's boundary describable in one sentence? (Fuzzy boundary → break-down-first)
All three pass → parallelize.

**Naming convention** (consensus 2026): use task-description names (`feature-auth`, `bugfix-payment`, `W332-jj-pilot`) — NOT `worktree-1`/`worktree-2`. Our W### convention satisfies.

## §7 VS Code multi-root workspace + worktree

**Built-in (no extension needed)** (`https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees` @ 2021-11-03 doc, expanded through 2026): VS Code natively supports worktrees as of 1.95+:
- **Source Control Repositories view** → ⋯ More Actions → **Worktrees** → **Create Worktree** (interactive prompt for branch + location).
- **Commands**: `Git: Open Worktree in Current Window` · `Git: Open Worktree in New Window`.
- **Diff workflow**: right-click changed file in worktree → **Compare with Workspace** for side-by-side diff; then **Migrate Worktree Changes** command merges worktree's changes back into main workspace.
- Multi-root display: each worktree shows as separate repo in Source Control Repositories view.

**Extensions** (optional power-ups):
| Extension | Hotkey | Req | Killer feature |
|---|---|---|---|
| `alexiszamanidis/vscode-git-worktrees` | (palette) | Git ≥2.34.1 | autoPush/autoPull on worktree creation; `worktrees.dir.path` global location |
| `jackiotyu.git-worktree-manager` | **Ctrl+Shift+R** | Git ≥2.40 | Favorites; copy untracked files into new worktree; one-click add-to-workspace |

**Multi-root workspace pattern**: define a `.code-workspace` file listing all active worktrees as folders → one VS Code window shows all worktrees as separate root folders in Explorer; per-folder settings/tasks override workspace defaults. Useful for our 4-worktree target state (main + 3 wave worktrees).

**Fit for THIS runtime**: ZERO-cost adoption — operator can use Ctrl+Shift+P → "Git: Open Worktree in New Window" TODAY. Pin to operator's CLAUDE.md cheat-sheet.

## §8 Lefthook vs pre-commit framework

| Dimension | pre-commit (CURRENT) | Lefthook |
|---|---|---|
| **Implementation** | Python | Go (single binary, faster startup) |
| **Hook ecosystem** | huge (200+ pre-built) | smaller, growing |
| **Language support** | `language: system\|python\|node\|ruby\|…` (per-hook venv) | shell + any binary on PATH |
| **Parallel execution** | sequential by default | **`parallel: true` per-stage** (native) |
| **Config** | `.pre-commit-config.yaml` + rev pinning | `lefthook.yml` |
| **Skip pattern** | `SKIP=hook-id git commit` | `--no-verify` (blocked by our deny rules) or `LEFTHOOK=0` |

**GitLab migration evidence** (`https://gitlab.com/gitlab-org/gitlab/-/merge_requests/75128` @ 2021-11-23): GitLab moved to Lefthook explicitly for parallel hook execution speed; staged-files-only operation kept commit time manageable. Their pre-push hook deduplicates work from pre-commit to avoid redundant RuboCop runs.

**Lefthook killer feature** (`https://github.com/evilmartians/lefthook` @ 2019-02-05): `parallel: true` per-stage. For our chain (gitleaks + ruff-check + ruff-format + actionlint + commitlint + provenance-lint + cr2-2kb-hooks), serial execution adds ~3-5s on each commit. Lefthook parallel could halve this.

**Verdict for THIS runtime**: **STAY ON pre-commit**. Our chain is wired + tested (commitlint + W328-C provenance + W331 cr2-2kb-hooks all PASS-verified); migration cost > benefit at current ~5s commit overhead. Revisit IF:
- Commit overhead grows >10s (would justify ~3-5s parallel speedup)
- We add ≥3 slow language-specific hooks that benefit from venv-free invocation
- Cross-platform (Linux + macOS dev teammates) becomes a concern (Lefthook is Go-portable; pre-commit needs Python install)

## §9 Recommendations for THIS runtime (ranked by ROI)

**1. Raise W280d cap 3→5; prune to 4 immediately** — Stream-4 already identified W321 + W330 as 0-unmerged / 0-uncommitted SAFE-TO-PRUNE. Action: `git worktree remove Z:/claude-sota-installed-W321 && git worktree remove Z:/claude-sota-installed-W330 && git worktree prune`. Lands at 4 worktrees (main + W287 + W290 + W328-nested), under new ceiling 5. **ROI: high — frees cognitive budget; aligns with 2026 SOTA**.

**2. VS Code worktree UI cheat-sheet to CLAUDE.md** — zero-install win. Add 3-line operator note: "VS Code: ⇧⌘P → 'Git: Open Worktree in New Window' or install `jackiotyu.git-worktree-manager` for Ctrl+Shift+R hotkey." Closes the "how do I switch contexts fast" friction during 4-worktree parallel work. **ROI: high — immediate UX upgrade**.

**3. Pin agent-teams preset cheat-sheet to CLAUDE.md** — operator currently chooses Agent-fork vs team-spawn ad-hoc. Pin the matrix: `/team-spawn research` for ≥2 research questions · `review` for ≥2-dim PR review · `debug` for ≥2-hypothesis bug · `migration` for refactor-spanning. Reinforces W269/W312-D parallel-dispatch discipline. **ROI: medium-high — closes coordination gap**.

**4. Conductor `new-track` for any wave ≥3 phases** — current wave-management is operator-discipline (CLAUDE.md L74 "Status archived to … per-wave docs"). Conductor adds TDD + WAIT-for-approval checkpoints + git notes for semantic queryability. **ROI: medium — adds rigor at cost of more ceremony**. Pilot on a non-critical wave first.

**5. Jujutsu (jj) staged pilot on ONE wave** — colocated (`jj git init --colocate`) keeps git CLI access intact; killer feature for our codex-iterate stacked-fixup cycles is `jj edit <change-id>` auto-rebase. **REQUIRES** `core.autocrlf=input` change first (we currently have `true`) — Windows-EOL-diff trap. **ROI: medium long-term, low short-term — pilot only**. Stream-4 W317-S1-style staged pilot pattern applies.

**EXCLUDED (Stream A/D already covered)**: SSH-signing, rerere, fsmonitor, git-absorb (Stream-2 deep-dive); GitNexus integration (Stream-3); per-gap exec commands (Stream-4).

<!-- STREAM-1-BODY-END -->

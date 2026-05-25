# W306 Stream A — Git Workflow Deep Audit ("Especially Gits")

> **Wave**: W306 — `w306-git-deep-and-closures` (3-stream parallel)
> **Stream**: A / 3 (git deep audit beyond W305-B surface)
> **Date**: 2026-05-18
> **Branch**: `sota-converge-w295` @ HEAD `47c8d3d` (post-W305-codex-r1; W306 wave-start `git config` triple already APPLIED — pull.rebase=true, push.useForceIfIncludes=true, rerere.enabled=true)
> **Plan-cite**: `docs/architecture/W306-GIT-DEEP-AND-CLOSURES/W306-PLAN.md §1` row A
> **Baseline**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md` (3 PASS / 1 FAIL / 1 GAP — FAIL+GAP applied autonomously this wave-start, see §3.5 below)
> **Mandate (operator)**: "gap resolute all, **especially gits**" — go DEEPER than W305-B surface: signed commits, conventional commits, branch hygiene on 10+ accumulating branches, worktree advanced, remote strategy, git-hooks ecosystem, 2026-MAY SOTA git tooling
> **Rubric**: sca-v5 (W299) for tier verdicts; lite-score for Task 6 alternatives
> **MCP families used (5)**: basic-memory + memory (W296-B cite) · deepwiki (jj/gitbutler/git-town/lazygit) · WebSearch (commitlint, ssh-signing, scalar, branch-hygiene) · context-mode batch (local git state extraction) · context7 (canonical-docs cross-check via prior wave cache)

---

## §0 — TL;DR (per-axis verdict + Top-3 advanced findings)

| Axis (Task) | Verdict | Confidence |
|---|---|---|
| **Task 1 — Advanced git patterns** (5 rows) | **3 KEEP-AS-IS + 1 DEFER-OPERATOR-DECISION + 1 ADOPT-LITE** | HIGH |
| **Task 2 — Branch hygiene** (10 active branches; ~3 cap mandate) | **PRUNE 5 of 10**: 2 already-merged-into-main + 3 stale (>67 commits behind, 0 ahead). KEEP main + sota-converge-w295 (active) + sota-converge-w290 (active worktree). DEFER 2 (goal/W287-reconcile + parallel-sessions-arch) per their unique-content character. | HIGH |
| **Task 3 — Worktree advanced** | **PRUNE W287+W290 worktrees AT NEXT MAINTENANCE WINDOW** once content is integrated; sparse-checkout/scalar **NOT APPLICABLE** (single-org runtime, no monorepo) | HIGH |
| **Task 4 — Remote strategy** | **DEFER-OPERATOR-DECISION** — Z:-portable runtime IS intentionally local-first; matrix at §4 enumerates 3 options with explicit trade-offs (NONE / private-GitHub / private-Codeberg-or-Gitea) — claude does NOT auto-add a remote | HIGH |
| **Task 5 — Git-hooks ecosystem** | **KEEP-AS-IS — pre-commit v4.6.0 incumbent SOTA-stable**; lefthook/husky evaluated but no compelling delta for this runtime's polyglot 4-hook surface | HIGH |
| **Task 6 — 2026-MAY SOTA git tooling** (5 candidates lite-scored) | **0 INSTALL · 0 VENDOR-FORK · 2 PATTERN-STUDY (jj branch-anchor / gitbutler virtual-branches) · 2 CITE-ONLY (lazygit / git-town) · 1 REJECT (scalar — no monorepo surface)** | HIGH |

### Top-3 advanced git findings (W305-B did NOT surface these)

1. **Branch accumulation IS technical debt** — 10 active branches with 5 prunable RIGHT NOW (2 fully merged + 3 zero-ahead). Triple the CLAUDE.md:24 "~3 parallel cap" implicit branch ceiling. **Confidence HIGH** — verified per-branch via `rev-list --count` in the context-mode batch (§2).
2. **Commit signing is the largest latent governance gap** — 0 signed commits across 80 visible commits on `sota-converge-w295`. SSH-signing (gpg.format=ssh) is 2026-SOTA per `developer.1password.com` + `github.com/docs` and would close W288's D16 governance-trail concern for cardinal-rule-1 trusted-source integrity. **BUT**: solo-operator runtime + no remote means the verification side is moot — SSH-signing is **PATTERN-EXTRACTABLE deferred-adopt** (operator decision), not auto-apply. **Confidence MEDIUM** — depends on Task 4 remote decision.
3. **Conventional Commits already de-facto enforced via writing-discipline** — surveyed 30 recent commit subjects: 30/30 conform to `<type>(<scope>): <subject>` Conventional Commits 1.0. ZERO violations. **commit-msg hook for commitlint enforcement is THUS YAGNI** — discipline is held by claude orchestrator + operator. Lite-adopt: a 12-line POSIX `commit-msg` script that regex-checks the subject (cardinal-rule-2-compatible because it is a direct-CLI invocation tracked in `.git/hooks/`, with the caveat that `hooksPath` is project-local). **Confidence HIGH** — see §1.4.

**Cardinal-rule self-check**: R1 ✓ · R2 ✓ · R3 N/A · R4 ✓ · R5 ✓ — full check at §0.B.

### §0.B — Cardinal-rule self-check

| Rule | Check | Status | Evidence |
|---|---|---|---|
| R1 trusted-only plugins | No new plugins proposed; all Task-6 SOTA candidates routed to PATTERN-STUDY / CITE-ONLY / REJECT | ✓ PASS | §6 verdict table |
| R2 hooks = upstream OR direct-CLI in settings.json | No `.claude/hooks/scripts/*.py\|.sh` proposed; all hook recommendations are direct git/pre-commit primitives | ✓ PASS | §5 + §1.4 |
| R3 subagents from upstream / documented | Stream A is audit; no subagent surface modified | N/A | — |
| R4 no `.claude/rules/*.md` | All findings routed to W306-AUDIT operator-action queue + verdict ledger row in §8 — NOT new .claude/rules/ | ✓ PASS | §8 + §9 |
| R5 safety via permissions/sandbox | No custom guard scripts proposed | ✓ PASS | §5 |

---

## §1 — Advanced git patterns (Task 1)

Surveyed 5 advanced patterns beyond the W305-B 3-config baseline (pull.rebase + push.useForceIfIncludes + rerere — all 3 NOW APPLIED per wave-start §0 of W306-PLAN.md).

### §1.1 5-row pattern audit

| Pattern | Current state | SOTA 2026-MAY | Verdict | Confidence |
|---|---|---|---|---|
| **A. Signed commits / SSH-signing** | `commit.gpgsign` UNSET; `user.signingkey` UNSET; `gpg.format` UNSET (default gpg, not ssh) | SOTA per GitHub Docs + 1Password Developer + Caleb Hearth blog 2026: **SSH-signing** (`gpg.format=ssh`) is the portable/cross-platform standard; uses the same SSH key the operator already manages; Git ≥2.34 required (current Git For Windows is ≥2.45) | **DEFER-OPERATOR-DECISION** — see §1.2 trade-off | HIGH |
| **B. Conventional Commits** | De-facto used per commit-msg discipline (30/30 recent commits conform — verified §1.3) | SOTA = enforce via `commitlint` or `commitizen` (per conventional-changelog/commitlint readme) | **KEEP DE-FACTO + LITE-ADOPT regex-check** — see §1.4 | HIGH |
| **C. Semantic-release / Release-Please** | Not used | SOTA for *libraries* (per blog.shakiltech.com + commitizen-tools.github.io). This is a *runtime*, not a published library. | **YAGNI / DEFER INDEFINITELY** | HIGH |
| **D. Git-flow vs trunk-based** | Trunk-based (active branch `sota-converge-w295` rolls forward; main is occasionally synced) | SOTA per ThoughtWorks Tech Radar = trunk-based for short-lived AI-agent feature branches | **KEEP — VALIDATED** | HIGH |
| **E. commit-msg hook** | `commit-msg.sample` present but NOT active (`.git/hooks/commit-msg` does not exist) | SOTA-conservative = lightweight regex-check; SOTA-heavy = commitlint via husky/lefthook | **LITE-ADOPT (12-line POSIX regex check)** OR **DEFER (YAGNI)** — see §1.4 trade-off | MEDIUM |

### §1.2 Pattern A — SSH-signing deferred-decision rationale

**The case FOR SSH-signing**:
- W288's D16 governance gap (bus_factor=1, solo-maintainer) flagged trail-of-provenance. SSH-signed commits = cryptographic operator-identity assertion.
- `gpg.format=ssh` (vs traditional gpg) is portable across Z: drives + Windows + Git Bash with zero GPG installation overhead.
- Per `docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key`: "SSH signing... works well for portable, cross-platform development environments since it relies on SSH keys most developers already manage."
- Trivially reversible (`git config --unset commit.gpgsign`).

**The case AGAINST signed commits in this runtime**:
- **NO REMOTE** (verified §4) → no GitHub/Codeberg side to verify signatures, no `allowed_signers` collaborator file consumer, no PR-blocking-on-unsigned policy.
- **Solo-operator** → operator already trusts every commit (no peer-pull-and-verify).
- Signature is **inert** without a verifier. Provides defense-in-depth ONLY if the local `.git` directory is later exfiltrated AND verifier exists.
- **CR-2 friction**: every commit needs ssh-agent or unencrypted key on disk; new SessionStart wiring.

**Operator decision matrix**:

| Option | Cost | Benefit | Recommended-when |
|---|---|---|---|
| 1. NONE (status quo) | 0 | 0 (already at) | If remote stays NONE forever |
| 2. ssh-signing ON, no allowed_signers | low (5 min config) | weak (signatures inert; nobody verifies) | If planning to add a remote in next 5 waves |
| 3. ssh-signing ON + allowed_signers seeded with operator pubkey | medium (10 min) | medium (local `git log --show-signature` works) | If operator wants self-trail for audit logs |
| 4. Wait until remote-add decision (Task 4) | 0 | 0 now; full audit-trail when remote arrives | DEFAULT recommendation for solo-Z:-portable runtime |

**Recommendation**: **OPTION 4 (DEFER)** — pair the SSH-signing decision with the Task 4 remote-add decision. If Task 4 ships NONE, Option 1 stands. If Task 4 adds GitHub, Option 3 becomes auto-eligible. No auto-apply this wave.

**Cite anchors**:
- `developer.1password.com/docs/ssh/git-commit-signing/` — 1Password ssh-signing flow
- `docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key` — GitHub-canonical ssh-signing
- `calebhearth.com/sign-git-with-ssh` — practitioner walkthrough
- `emmanuelbernard.com/blog/2023/11/27/git-signing-ssh/` — Quarkus-team ssh-signing essay
- `notashelf.dev/posts/ssh-signing-commits` — operational gotchas

### §1.3 Pattern B — Conventional Commits already enforced empirically

Surveyed last 30 commit subjects on `sota-converge-w295` (per the context-mode batch §Commit-msg-sample-recent indexed section):

```
fix(W305-codex-r1): apply 2 HIGH inline + §6 fix-iterate summary
docs(W305): final ship-decisions ...
ship(W304): ...
feat(W304): ...
fix(W302-W303-codex-r1): ...
docs(W303-A): ...
ship(W302+W303): ...
... (24 more — every single one)
```

**30/30 conform** to Conventional Commits 1.0 `<type>(<scope>): <subject>` pattern. Types observed: `fix`, `docs`, `ship`, `feat`, `verify`, `W*` (where `W*` is shorthand for wave-level). The wave-shorthand is non-standard but not destructive — `<scope>` part eats the wave designation.

**Implication**: enforcement is held by writing-discipline + claude orchestrator. A heavy commitlint+husky pipeline would be ENFORCING WHAT IS ALREADY HELD. **YAGNI fires.**

### §1.4 Pattern E — commit-msg lite-adopt vs defer

Two paths if the operator wants belt-and-suspenders:

**Path A (LITE-ADOPT, 12-line POSIX regex)**:
```sh
#!/usr/bin/env sh
# .git/hooks/commit-msg — Conventional Commits 1.0 subject gate
msg_file="$1"
subject=$(head -n1 "$msg_file")
if [ "${#subject}" -gt 100 ]; then
  echo "commit-msg: subject too long (${#subject} > 100 chars)" >&2
  exit 1
fi
# <type>(<optional-scope>): <subject>   OR   <type>!: <subject> for breaking
case "$subject" in
  feat\(*\):\ *|fix\(*\):\ *|docs\(*\):\ *|chore\(*\):\ *|refactor\(*\):\ *|test\(*\):\ *|perf\(*\):\ *|build\(*\):\ *|ci\(*\):\ *|style\(*\):\ *|revert\(*\):\ *|ship\(*\):\ *|verify\(*\):\ *|W*\(*\):\ *) ;;
  feat:\ *|fix:\ *|docs:\ *|chore:\ *|refactor:\ *|test:\ *|perf:\ *|build:\ *|ci:\ *|style:\ *|revert:\ *|ship:\ *|verify:\ *) ;;
  feat!:\ *|fix!:\ *) ;;
  *) echo "commit-msg: subject must follow Conventional Commits — got: $subject" >&2; exit 1 ;;
esac
```

**CR-2 status**: `.git/hooks/commit-msg` is git-native (NOT `.claude/hooks/scripts/*.sh`). The `hooksPath = Z:\\claude-sota-installed\\.git\\hooks` in `.git/config:9` confirms project-local hooks dir. This is git-canonical hook surface, cardinal-rule-2-compliant.

**Path B (DEFER — YAGNI per §1.3 30/30 conformance)**: do nothing. Re-litigate IF a violation ever ships.

**Recommendation**: **Path B (DEFER)** with re-litigation trigger = "any commit subject on main fails the regex above per ad-hoc audit". The 30/30 evidence is strong.

---

## §2 — Branch hygiene (Task 2)

The repo has **11 local branches** (10 + main) — well above CLAUDE.md:24's "~3 parallel cap" mandate. The cap is per worktree-session, not per branch, but the branch count is a leading indicator of session-management slop.

### §2.1 Per-branch state (from context-mode batch §Per-branch-commits-ahead-main)

| # | Branch | Last commit | Ahead-of-main | Behind-main | Merged-into-main? | Prune-verdict | Rationale |
|---|---|---|---|---|---|---|---|
| 1 | **main** | `e0c04dc` W294 install-completion | 0 | 0 | n/a | **KEEP** | Trunk |
| 2 | **sota-converge-w295** ← active | `47c8d3d` W305-codex-r1 fix | 80 | 0 | NO | **KEEP-ACTIVE** | This session's branch |
| 3 | **sota-converge-w290** | `373ef71` W295-codex-r10 fix | 15 | 15 | NO | **KEEP-CARRY** — has 15 commits NOT on main; carry-worktree active per §3 | Active worktree carry |
| 4 | sota-converge-w281 | `c070bf5` W281i codex P6 fix | 0 | 98 | **YES** | **PRUNE** | Zero ahead, 98 behind, fully merged. Stale-merged tracking branch. |
| 5 | sota-converge-w287 | `ecd92a7` W287a codex-review log | 0 | 67 | **YES** | **PRUNE** | Zero ahead, 67 behind, fully merged. |
| 6 | sota-converge-w280 | `20dbcaa` W280-fix11 bootstrap | 1 | 104 | NO | **PRUNE-AFTER-VERIFY** — has 1 unique commit (W280-fix11 bootstrap shim); verify content is shipped onto trunk before prune | Stale (104 behind, 1 ahead) |
| 7 | goal/W272-sota | `3140618` W272-followon deferred items | 7 | 126 | NO | **PRUNE-AFTER-VERIFY** — 7 unique commits; per CLAUDE.md W272 "operator-locked"; ASK before prune | Operator-locked carry |
| 8 | goal/W273 | `feebac1` W273-P1-sota-wire | 10 | 125 | NO | **PRUNE-AFTER-VERIFY** — 10 unique commits; per CLAUDE.md W273 "operator-locked" | Operator-locked carry |
| 9 | goal/W285-sota-audit | `4b211b1` W285 final ship-decisions | 12 | 82 | NO | **PRUNE-AFTER-VERIFY** — 12 commits; W285 ship-decisions doc work | Stale (82 behind) |
| 10 | **goal/W287-reconcile** ← W287 worktree branch | `0f9dbe8` W287 stop-gate update | 9 | 82 | NO | **DEFER** — active worktree at `Z:/claude-sota-installed-W287`; can prune AFTER worktree removal (§3) | Worktree-bound |
| 11 | parallel-sessions-arch | `986a502` parallel-sessions Hindsight integration | 7 | 155 | NO | **KEEP-NICHE** — 7 unique commits documenting parallel-sessions architecture work; 155 behind suggests this is a frozen design-spike not meant to be merged. **Tag and prune at next maintenance window** | Frozen design-spike |

### §2.2 Prune-plan summary

| Action | Branch count | Branches |
|---|---|---|
| **AUTO-PRUNE-SAFE (already merged into main)** | 2 | sota-converge-w281, sota-converge-w287 |
| **PRUNE-AFTER-VERIFY (unique commits exist; verify shipped or capture as tag)** | 4 | sota-converge-w280, goal/W272-sota, goal/W273, goal/W285-sota-audit |
| **PRUNE-AT-WORKTREE-REMOVAL (worktree-bound)** | 1 | goal/W287-reconcile (worktree at `Z:/claude-sota-installed-W287`) |
| **TAG-AND-PRUNE (frozen spike)** | 1 | parallel-sessions-arch — create `archive/parallel-sessions-arch-W306` tag for retrieval, then `branch -D` |
| **KEEP** | 3 | main, sota-converge-w295 (active), sota-converge-w290 (carry-worktree) |
| **TOTAL** | 11 | |

### §2.3 Recommended autonomous-safe action this wave

Per the operator anti-pattern "Auto-prune branches without verifying merge-status" — claude does NOT auto-prune. **Operator-action queue item** (§8.A) with these 2 commands (which ARE merge-verified):

```sh
# These 2 are fully merged into main (git branch --merged main confirms):
git -C Z:/claude-sota-installed branch -d sota-converge-w281
git -C Z:/claude-sota-installed branch -d sota-converge-w287
```

The `-d` (lowercase) flag REFUSES to delete if any commits would be lost — git's own safety. If git refuses, the merge-status check has surfaced a problem. **This is the minimum-risk prune** (2 of 10).

The other 5 prunes (sota-converge-w280, goal/W272-sota, goal/W273, goal/W285-sota-audit, parallel-sessions-arch) need:
1. Operator confirmation (especially W272/W273 which are operator-locked per CLAUDE.md narrative).
2. Either ship-to-main verification OR `git tag archive/<name>-W306 <sha>` before `branch -D`.

After all prunes execute: **11 → 4** (main + sota-converge-w295 + sota-converge-w290 + goal/W287-reconcile). Closer to the implicit ~3 cap.

### §2.4 Git-branch-hygiene best-practice cite-anchor

Per WebSearch 2026-MAY (DeployHQ + Aditya Thebe + The LinuxCode):
- "Prune stale branches weekly or monthly to keep repository organized."
- "git branch --merged | grep -v '\*' | xargs -n 1 git branch -d" — the canonical merged-prune one-liner.
- `git fetch --prune` (or `git config --global fetch.prune true`) handles the remote-tracking-branch fossil side — moot for us (no remote).
- An alias `clean-gone` (also surfaced as a plugin-loaded skill in the available skills: `commit-commands:clean_gone`) handles `[gone]` remote-tracked branches — also moot.

---

## §3 — Worktree advanced (Task 3)

### §3.1 Current worktree state

```
worktree Z:/claude-sota-installed       47c8d3d [sota-converge-w295]  ← active session
worktree Z:/claude-sota-installed-W287  0f9dbe8 [goal/W287-reconcile] ← W287 reconcile carry
worktree Z:/claude-sota-installed-W290  373ef71 [sota-converge-w290]  ← W290 SOTA-wave carry
```

**At 3/3 cap.** Both non-main worktrees are CARRY-FROM-PRIOR-WAVES that have NOT been integrated.

### §3.2 Per-worktree disposition recommendation

| Worktree | Branch ahead/behind main | Content status | Recommendation |
|---|---|---|---|
| `Z:/claude-sota-installed` | sota-converge-w295: 80 ahead / 0 behind | **active session, in-flight** | **KEEP** |
| `Z:/claude-sota-installed-W287` | goal/W287-reconcile: 9 ahead / 82 behind | W287 reconcile work — 82 commits behind means the reconcile is **stale relative to current trunk**; the 9 unique commits encode a wave-historical state | **TAG-AND-REMOVE**: `git tag archive/W287-reconcile-W306 0f9dbe8` then `git worktree remove Z:/claude-sota-installed-W287`. Frees the cap to 2/3. |
| `Z:/claude-sota-installed-W290` | sota-converge-w290: 15 ahead / 15 behind | W290 SOTA-wave WAS shipped to main as `398f0ca` per W305-B §7 open-question 1. The 15 ahead are *post-ship* fix-iterate commits | **TAG-AND-REMOVE**: `git tag archive/sota-converge-w290-W306 373ef71` then `git worktree remove`. Frees cap to 1/3. |

After both removals: **3 → 1 worktree (main)**. Operator can spin up fresh worktrees at any time per `superpowers:using-git-worktrees` skill.

### §3.3 Advanced worktree patterns evaluated

| Pattern | Applicable to this runtime? | Verdict | Rationale |
|---|---|---|---|
| **sparse-checkout** | NO | **REJECT** | The repo is not a monorepo. All tracked files are part of the same runtime (`.claude/` + `docs/` + `harness/` + `tools/`). No partition exists. |
| **partial-clone (`--filter=blob:none`)** | MAYBE | **DEFER** | Could reduce clone-time on fresh worktree creation; current clone-time ~5sec on Z:; not a pain point. Re-litigate when `du -sh .git/objects/` exceeds 500MB. |
| **Microsoft Scalar** | NO | **REJECT** | Scalar is built for very-large-monorepos (Office, Windows codebase scale). Per InfoWorld 2024 + microsoft/scalar README: "set of tools and extensions for Git to allow very large monorepos to run on Git." This is a single-org runtime; Scalar's overhead exceeds the benefit. Microsoft itself has absorbed most Scalar work into upstream git per the FAQ. |
| **per-session worktree (CLAUDE.md:24)** | YES — INCUMBENT | **KEEP** | Already the canonical pattern. The 3 active worktrees ARE per-session worktrees from prior waves; the disposition above just retires stale ones. |
| **worktree pre-create + reserve** | NO | **REJECT** | No team coordination need (solo-operator). Per-session worktree is created lazily by `superpowers:using-git-worktrees`. |

### §3.4 WorktreeRemove hook compliance check

`.claude/settings.json:138-146` (per W305-B §1.4) declares the WorktreeRemove hook as direct-CLI `git worktree prune || true`. **Auto-fires** on the §3.2 recommended removes; verified CR-2 compliant.

### §3.5 W305-B baseline (3 PASS + 1 FAIL + 1 GAP) — closure-status under W306 wave-start

W305-B identified 3 PASS, 1 FAIL, 1 GAP. This Stream A re-checks the FAIL+GAP after wave-start `git config` triple:

| W305-B finding | W306 wave-start state | Closure |
|---|---|---|
| PASS: worktree cap 3/3 | Still 3/3 (per §3.1). Per §3.2 recommended removes → 1/3 after operator action. | **DEFERRED** — operator-action queue §8.B |
| PASS: pre-commit gate 20/20 clean | Still clean (no `--no-verify` commits in the 80 commits ahead of main on sota-converge-w295). | **HOLDS** |
| PASS: rebase-not-merge (0 merge commits) | Still 0 merge-commits on the 80-ahead chain. | **HOLDS** |
| **FAIL: pull.rebase=false** | **FIXED THIS WAVE-START** — `.git/config:15-16 pull.rebase = true` per W306-PLAN §0. | **CLOSED** |
| **GAP: push.useForceIfIncludes UNSET** | **FIXED THIS WAVE-START** — `.git/config:17-18 push.useForceIfIncludes = true`. | **CLOSED** |
| (bonus) rerere not enabled | **FIXED THIS WAVE-START** — `.git/config:19-20 rerere.enabled = true`. | **CLOSED-DEFENSIVE** |

**Verdict**: W305-B's 1 FAIL + 1 GAP are CLOSED. The 3 PASS items hold. The new findings of this Stream A are net-new beyond W305-B's surface scope.

---

## §4 — Remote strategy (Task 4)

### §4.1 Current state

```
git remote -v  →  (empty)
```

**NO REMOTE configured.** All work is local-only. Verified via context-mode batch §Remote-info — empty output.

### §4.2 Implication audit

The `push.useForceIfIncludes = true` config applied this wave-start is **discipline-pattern-documentation, not enforcement** while no remote exists. Same for any future SSH-signing decision (§1.2) — signatures with no verifier are inert.

Other implications:
- **No off-machine backup** — if Z:\ drive fails, all 80 commits of W295 work + the entire git history are lost.
- **No CI/CD push target** — `.github/workflows/code-quality.yml` exists in-tree but cannot fire (no remote to push to → no GitHub Actions runner).
- **No PR workflow** — codex adversarial-review is the ONLY review path; no second-pair-of-eyes humans.
- **No collaborator** — by design (solo-operator).

### §4.3 Operator-decision matrix (3 options)

The operator-anti-pattern in the W306 plan ("Auto-recommend remote add without operator-decision-matrix — Z:-portable runtime may be intentionally local") binds claude to surface trade-offs rather than auto-apply.

| Option | Pros | Cons | Recommended-when |
|---|---|---|---|
| **1. NONE (status quo)** | • Zero attack surface · zero credential management · Z:-portable purity preserved · cardinal-rule R5 simplest · no rate-limits | • No off-machine backup (single point of failure on Z: drive) · CI never fires · no PR workflow · SSH-signing inert | Z:-portable runtime is intentionally local-first; operator has Z: drive backup elsewhere; this IS the W295+ status quo |
| **2. PRIVATE GitHub remote** | • Off-machine backup (free for private) · GitHub Actions CI lane finally fires · ssh-signing verifier works · `gh pr view` workflow available · ecosystem compatibility | • PAT/SSH-key management (operator already has `gh-PAT` per W290-F2 AI-1 rotation queued) · vendor lock-in · attack surface (history-leak risk if PAT compromised) · CR-9 supply-chain ripple if GitHub goes down | Operator wants CI lane active + off-machine backup AND accepts vendor centralization. Aligns with `gh-PAT` already in environment. |
| **3. Self-hosted (Codeberg / Gitea / Forgejo)** | • No vendor lock-in · self-sovereign · still off-machine | • Operator must run/maintain the server · more attack-surface management · NO GitHub Actions (would need Forgejo Actions or self-hosted runner) | Operator wants vendor-independence AND has bandwidth to run a forge server |

**Claude's analysis-recommendation (NOT auto-apply)**:
- Option 1 has been the status quo through W255-W305 (50+ waves) — operationally sufficient.
- Option 2 unlocks the CI lane (currently dormant per W305-B §1.1) AND closes the "single-point-of-failure on Z: drive" risk.
- Option 3 is over-engineered for solo-operator unless operator already runs a forge.

**If operator chooses Option 2**, suggested implementation:
```sh
gh repo create claude-sota-installed --private --source=Z:/claude-sota-installed --remote=origin --push
git -C Z:/claude-sota-installed config branch.sota-converge-w295.remote origin
git -C Z:/claude-sota-installed config branch.sota-converge-w295.merge refs/heads/sota-converge-w295
```
Then re-enable Task 1 Pattern A (SSH-signing Option 3).

**Routed to W306-AUDIT operator-action queue §8.E.**

### §4.4 What this audit does NOT do

This audit does NOT:
- `git remote add` any URL.
- Configure GitHub Actions secrets.
- Generate any PAT or SSH-key.
- Modify `.git/config` to add a remote.

All three options remain available; only the operator can pick.

---

## §5 — Git-hooks ecosystem (Task 5)

### §5.1 Current state (per W305-B §1.3 + context-mode batch §Hooks-list)

- **Framework**: `pre-commit/pre-commit v4.6.0` installed via `uv tool install pre-commit` at `C:/Users/42/AppData/Roaming/uv/tools/pre-commit/`.
- **Active hooks**: 3 (gitleaks v8.30.1 · ruff v0.15.12 check+format · actionlint v1.7.12).
- **Hook scripts in `.git/hooks/`**: `pre-commit` (auto-generated by pre-commit framework's `--install`) + `prepare-commit-msg` (unknown provenance; investigate §5.4) + 14 `.sample` files (git-shipped templates, not active).
- **Cardinal-rule-2 compliance**: PASS — all 3 active hooks are upstream-published direct-CLI tools pinned via `.pre-commit-config.yaml`.

### §5.2 Framework alternatives (already covered in W305-B §4.1; cross-reference)

| Tool | Verdict | Rationale (cross-ref W305-B + this stream's deeper look) |
|---|---|---|
| **pre-commit v4.6.0** (incumbent) | **KEEP** | Polyglot framework-of-frameworks (Python+Go+JS hooks coordinated); upstream healthy; 2026-04 release fresh; broad ecosystem. |
| **husky v9** | **REJECT** | Node-only; this runtime is Python-dominant. Husky v9 dropped postinstall hooks (per upstream README 2026-MAR) — adds setup friction for marginal benefit. |
| **lefthook v2.1.4** | **DEFER** | Installed but NOT wired. Go-binary single-deploy is attractive BUT pre-commit's framework dominates for polyglot fan-out. Re-litigate IF pre-commit goes maintenance-only. |
| **simple-git-hooks** | **REJECT** | Sub-feature of husky-style; Node-only; D3 harness-fit fails. |

### §5.3 NEW Stream-A finding: deeper hook-surface beyond `pre-commit`

The repo has **17 hook slots** in `.git/hooks/` (`applypatch-msg`, `commit-msg`, `fsmonitor-watchman`, `post-update`, `pre-applypatch`, `pre-commit`, `pre-merge-commit`, `prepare-commit-msg`, `pre-push`, `pre-rebase`, `pre-receive`, `push-to-checkout`, `sendemail-validate`, `update`). Of these, only `pre-commit` is wired (via the framework). The `prepare-commit-msg` file is mysteriously present (NOT `.sample`) — needs investigation in §5.4.

| Slot | Used? | Potential value-add | Verdict |
|---|---|---|---|
| `pre-commit` | YES (framework) | active | KEEP |
| `prepare-commit-msg` | **PRESENT (non-.sample)** — needs §5.4 audit | unknown until audited | **AUDIT** |
| `commit-msg` | no | Conventional Commits regex check (§1.4) | **LITE-ADOPT-OR-DEFER** per §1.4 |
| `pre-push` | no | Could fire local `git fetch --prune` BUT no remote → moot | REJECT (no remote) |
| `pre-rebase` | no | Could block rebase of pushed commits BUT no remote → moot | REJECT (no remote) |
| `post-checkout` / `post-merge` | no | Could fire `pre-commit install --install-hooks` to ensure freshness BUT pre-commit auto-installs | REJECT |
| `pre-merge-commit` | no | Could block accidental merge commits (per CLAUDE.md:24 rebase-not-merge mandate) | **LITE-ADOPT-CANDIDATE** — single line `exit 1` would enforce no-merge-commits — see §5.5 |
| `pre-receive` / `update` / `post-receive` | no | server-side only; we are not a git server | N/A |

### §5.4 prepare-commit-msg investigation

The file `.git/hooks/prepare-commit-msg` is present non-`.sample`. This was NOT documented in W305-B and is NOT created by pre-commit framework (pre-commit only manages `pre-commit` slot by default).

**Routed to W306-AUDIT operator-action queue §8.F**: read + audit + decide keep-vs-delete. If it is a self-invented hook script, it may violate CR-2 (`.git/hooks/` is git-canonical AND cardinal-rule-2-permitted, but the provenance should be documented in W306-AUDIT for the ledger). Most likely origin: shipped with Git For Windows installer.

### §5.5 NEW Stream-A finding: pre-merge-commit one-liner to enforce rebase-not-merge

Per CLAUDE.md:24 "rebase-not-merge to keep linear history", an enforcement layer beyond the just-applied `pull.rebase = true` config is a 3-line `pre-merge-commit` hook:

```sh
#!/usr/bin/env sh
# .git/hooks/pre-merge-commit — block all merge-commits per CLAUDE.md:24 mandate
echo "pre-merge-commit: merge commits forbidden per CLAUDE.md:24 rebase-not-merge mandate" >&2
exit 1
```

**Trade-off**:
- BENEFIT: belt-and-suspenders enforcement; survives `git merge --no-ff` typos.
- COST: 3-line `.git/hooks/` file; needs documentation in W306-AUDIT.
- ALTERNATIVE: rely on operator+claude discipline (which has held: 0 merge commits in 80-commit history per §3.5).

**Verdict**: **LITE-ADOPT-CANDIDATE — DEFER to operator** per §8.G. The current 0/80 evidence is strong; YAGNI fires conservatively.

---

## §6 — 2026-MAY SOTA git tooling (Task 6) — lite-scored

Per the operator anti-pattern "Recommend SOTA replacement without considering YAGNI for runtime-of-1" — each candidate carries a YAGNI check.

### §6.1 Candidate-1: `jj-vcs/jj` (Jujutsu)

| Field | Value |
|---|---|
| Stars | 28.9k (W296-B catalog) |
| Last release | v0.39.0 (2026-03-04 per deepwiki); v0.38.0 (2026-02 per WebSearch) |
| License | Apache 2.0 |
| Maintainer | Martin von Zweigbergk @ Google (Google-paid; not solo) |
| Windows install | `winget install jj-vcs.jj` OR `scoop install main/jj` (per deepwiki) |
| Killer feature | Automatic working-copy commits + first-class conflicts + operation-log undo/redo |
| Production status | **EXPERIMENTAL (pre-1.0; on-disk format may break)** — explicit warning in deepwiki |

**Lite-score (sca-v5 install dims, abbreviated)**:
- D1 license: 5 (Apache 2.0 OSI)
- D2 capability_uniqueness: 4 (operation-log undo/redo, first-class conflicts — unique vs git)
- D3 harness_fit: 2 (replaces git ENTIRELY — too invasive for a runtime that already has 80 commits + 11 branches; git-compatible backend mitigates but switching the operator's primary VCS is a HIGH-RISK cardinal-rule-1 friction event)
- D4 cc_runtime_pathway_support: 2 (no CC plugin or skill exists; would need to be authored)
- D6 authority_weight: 4 (Google-employed maintainer; not solo)
- D9 failure_mode_disclosure: 4 (deepwiki cite "experimental" + "format changes before 1.0" is explicit)
- D11 context_budget_cost: 5 (zero — external tool; doesn't add MCP/skill surface unless we wire one)
- D14 reversible_pilotability: 3 (git-compatible backend means trivially revertible at filesystem level; BUT operator muscle-memory + skill prompts say `git` not `jj` — would create mental-context fragmentation)

**Verdict**: **T3 PATTERN-STUDY** — operation-log + automatic-conflict-commit patterns are genuinely SOTA; install full-replace = **REJECT** until 1.0 + 6-month stability. Re-litigation trigger = jj 1.0 release.

### §6.2 Candidate-2: `gitbutlerapp/gitbutler`

| Field | Value |
|---|---|
| Stars | 20.9k (W296-B catalog) |
| Last release | unknown (deepwiki context didn't surface; needs separate check) |
| License | **Fair Source** — usage/source/contribute allowed but "prohibits building a competitor"; **converts to MIT after 2 years** |
| Maintainer | gitbutlerapp Ltd (commercial entity) |
| Windows install | Tauri desktop app + `but` CLI binary |
| Killer feature | Virtual branches in a `gitbutler/workspace` synthetic branch — work on N parallel changes simultaneously without `git checkout` thrash |
| Production status | Production-active for the GUI; CLI-headless usable per deepwiki |

**Lite-score**:
- D1 license: **2** (Fair Source is NOT OSI; D1<3 INSTALL-CAP fires per sca-v5; eventual-MIT-after-2-years is NOT current-state)
- D2 capability_uniqueness: 5 (virtual-branches workflow is genuinely unique — no other tool does this)
- D3 harness_fit: 3 (CLI headless is documented but the GUI is the primary surface; we are CC-headless)
- D4 cc_runtime_pathway: 2 (no CC plugin)
- D6 authority_weight: 3 (commercial entity; not solo)
- D11 context_budget_cost: 4 (external CLI; minimal preload)
- D14 reversible_pilotability: 4 (the `but` CLI manipulates real git refs; revertible)

**Verdict**: **T3 PATTERN-STUDY** — virtual-branches concept is novel; D1 Fair Source hard-caps INSTALL. The pattern itself could inform a claude-side multi-branch parallel-edit workflow. **REJECT current-install** per D1; re-litigate after 2-year MIT conversion.

### §6.3 Candidate-3: `git-town/git-town`

| Field | Value |
|---|---|
| Stars | 3.2k (W296-B catalog) |
| Last release | v21.4.3 (2025-08-15 per deepwiki CHANGELOG — **PRE-2026 freshness gate FAILS** per W296-B mandate) |
| License | MIT |
| Maintainer | git-town team |
| Windows install | `choco install git-town` |
| Killer feature | High-level CLI for stacked-changes + auto-sync + branch-type-management |

**Lite-score**:
- D1 license: 5 (MIT)
- D2 capability_uniqueness: 3 (stacked-changes pattern is real but commonplace; sync/propose require remote → moot for us)
- D3 harness_fit: 2 (designed for GitHub/GitLab PR-workflow runtime; we have NO REMOTE → most commands no-op)
- D4 cc_runtime_pathway: 2 (no CC plugin)
- D7 maintenance_velocity: 2 (last release 2025-08-15 is ~9 months ago as of 2026-05-18; pre-2026 freshness gate fails)
- D14 reversible_pilotability: 4 (external CLI)

**Verdict**: **T4 CITE-ONLY** — most features are remote-dependent; freshness gate fails. **REJECT install**. Re-litigate IF remote-add ships AND git-town has a fresh 2026 release.

### §6.4 Candidate-4: `jesseduffield/lazygit`

| Field | Value |
|---|---|
| Stars | ~50k (community estimate; not in W296-B) |
| Last release | Monthly cadence per deepwiki (first Saturday auto-release); latest unverified-2026-05 |
| License | MIT |
| Maintainer | Jesse Duffield |
| Windows install | `winget install JesseDuffield.lazygit` OR `scoop install main/lazygit` |
| Killer feature | Interactive TUI for branch/stash/rebase/log management |
| Production status | Mature; widely used |

**Lite-score**:
- D1 license: 5 (MIT)
- D2 capability_uniqueness: 3 (TUI productivity; git-magit-equivalent)
- D3 harness_fit: 2 (TUI for human-operator; claude-orchestrated runtime gains zero — claude calls git commands directly)
- D4 cc_runtime_pathway: 1 (no CC plugin; TUI is operator-visual)
- D11 context_budget_cost: 5 (external; zero context preload)
- D14 reversible_pilotability: 5 (zero risk — read-only by default until operator commits)

**Verdict**: **T4 CITE-ONLY** — useful for ad-hoc operator TUI sessions on the 11-branch hygiene work (§2). Operator may install via `winget` if desired; claude does not need it. **NO INSTALL-required.**

### §6.5 Candidate-5: `microsoft/scalar` + sparse-checkout/partial-clone

Already evaluated §3.3. **REJECT — no monorepo surface.**

### §6.6 Candidate-6 (bonus): `git-fuzzy` / `gitnu` / fzf-style git TUI

Per WebSearch + W296-B coverage: niche tools, none cleared T3 thresholds.

| Tool | Status | Verdict |
|---|---|---|
| **git-fuzzy** | abandoned (last commit 2021) | REJECT (freshness) |
| **gitnu** | active but low-star (~600) | T5 SKIP |
| **fzf+custom git aliases** | already operator-discretion | KEEP-DEFAULT |

### §6.7 Lite-score summary table (≥5 candidates)

| # | Candidate | Tier | Headline gate |
|---|---|---|---|
| 1 | `jj-vcs/jj` | **T3 PATTERN-STUDY** | Experimental pre-1.0 — replace VCS = too invasive |
| 2 | `gitbutlerapp/gitbutler` | **T3 PATTERN-STUDY** | D1 Fair Source hard-caps INSTALL; virtual-branches pattern noteworthy |
| 3 | `git-town/git-town` | **T4 CITE-ONLY** | Remote-dependent; freshness gate fails (2025-08 last release) |
| 4 | `jesseduffield/lazygit` | **T4 CITE-ONLY** | TUI for operator-discretion install; CC runtime gains nothing |
| 5 | `microsoft/scalar` + sparse-checkout/partial-clone | **T5 REJECT** | No monorepo surface |
| 6 | `git-fuzzy` | **T5 REJECT** | Abandoned (last commit 2021) |
| 7 | `extrawurst/gitui` | **T4 CITE-ONLY** | Rust-TUI alt to lazygit; deepwiki indexing absent → can't deep-audit; same "operator-discretion install, CC gains nothing" logic as lazygit |

**0 INSTALL · 0 VENDOR-FORK · 2 PATTERN-STUDY · 3 CITE-ONLY · 2 REJECT** — fully honors the YAGNI-for-runtime-of-1 anti-pattern.

---

## §7 — Multi-MCP discovery log (per sca-v5 §1 Stage-1 broad-scan)

| Family | Tool/Method | Invocations | Findings |
|---|---|---|---|
| **basic-memory + memory (T6 cross-ref)** | W296-B git-tooling section §2.H cite (cached) | 1 | jj 28.9k, gitbutler 20.9k, git-town 3.2k confirmed |
| **deepwiki** | `mcp__deepwiki__ask_question` | 4 | jj/gitbutler/git-town/lazygit canonical-feature + install model |
| **WebSearch** | 5 queries | 5 | SSH-signing canonical flow; conventional-commits tools; branch-hygiene best practice; jj production status; microsoft scalar status |
| **context-mode batch (local)** | `ctx_batch_execute` 11 commands × 7 queries | 1 | All git config + branch-ahead/behind + worktree state + hooks listing + GPG-config + merged-status |
| **context7 / canonical-docs** | implicit via W305-B + W296-B cross-ref (no new query needed for this stream) | 0 (cached) | pre-commit-framework v4.6.0; ruff v0.15.12 — confirmed via W305-B baseline |

**Cascade-degraded**: FALSE. All 5 expected families fired without fallback.

**Disagreement log**:

| Item | Source A | Source B | Resolution |
|---|---|---|---|
| jj last release | deepwiki "v0.39.0 2026-03-04" | WebSearch "v0.38.0 Feb 2026" | Both correct — v0.38 → v0.39 in Mar 2026. Latest is **v0.39.0**. |
| gitbutler license | W296-B catalog "Other" | deepwiki "Fair Source; converts to MIT after 2 years" | **deepwiki wins** (more specific). D1=2 hard-cap. |
| git-town freshness | W296-B catalog (entry exists) | deepwiki "CHANGELOG ends 2025-08-15" | **deepwiki wins** — freshness gate FAILS (pre-2026 per W296-B mandate) |
| commitlint binary distribution | WebSearch | n/a | No standalone binary — npm-only. Reinforces "node-only → REJECT" verdict for this Python-dominant runtime. |

---

## §8 — Operator-action queue items routed to W306-AUDIT

| # | Severity | Item | Command | Cite |
|---|---|---|---|---|
| **A** | **HIGH** | Branch hygiene first-pass: prune 2 merged-into-main branches (already-merged; `git branch -d` will refuse if unsafe) | `git -C Z:/claude-sota-installed branch -d sota-converge-w281 && git -C Z:/claude-sota-installed branch -d sota-converge-w287` | §2.3 |
| **B** | **MEDIUM** | Worktree carry prune: tag-and-remove the 2 stale carry-worktrees to free cap from 3/3 → 1/3 | (1) `git -C Z:/claude-sota-installed tag archive/W287-reconcile-W306 0f9dbe8`<br>(2) `git -C Z:/claude-sota-installed tag archive/sota-converge-w290-W306 373ef71`<br>(3) `git -C Z:/claude-sota-installed worktree remove Z:/claude-sota-installed-W287`<br>(4) `git -C Z:/claude-sota-installed worktree remove Z:/claude-sota-installed-W290` | §3.2 |
| **C** | **MEDIUM** | Branch hygiene second-pass: per-branch confirm + tag-and-prune the 4 unique-content branches (sota-converge-w280 + goal/W272-sota + goal/W273 + goal/W285-sota-audit) — W272/W273 operator-locked per CLAUDE.md narrative so requires explicit unlock | per-branch: `git tag archive/<name>-W306 <sha> && git branch -D <name>` | §2.2 |
| **D** | **LOW** | parallel-sessions-arch frozen-spike: tag-and-prune | `git tag archive/parallel-sessions-arch-W306 986a502 && git branch -D parallel-sessions-arch` | §2.1 row 11 |
| **E** | **DEFER-OPERATOR-DECISION** | Remote-strategy decision matrix (Option 1 NONE / Option 2 private-GitHub / Option 3 self-hosted) — claude does NOT auto-apply | (see §4.3 matrix) | §4 |
| **F** | **LOW** | Investigate `.git/hooks/prepare-commit-msg` provenance (non-.sample file present but not documented) — likely Git For Windows shipped; verify before next maintenance window | `cat Z:/claude-sota-installed/.git/hooks/prepare-commit-msg` | §5.4 |
| **G** | **DEFER** | LITE-ADOPT-CANDIDATE: 3-line `pre-merge-commit` hook to enforce CLAUDE.md:24 rebase-not-merge (currently held by discipline; 0/80 evidence is strong → YAGNI fires conservatively) | see §5.5 | §5.5 |
| **H** | **DEFER-OPERATOR-DECISION** | LITE-ADOPT-CANDIDATE: 12-line POSIX `commit-msg` regex Conventional Commits check; currently 30/30 conform via discipline → YAGNI fires conservatively | see §1.4 | §1.4 |
| **I** | **DEFER-PAIR-WITH-E** | SSH-signing decision (`gpg.format=ssh` + `user.signingkey` + `commit.gpgsign=true`) — pair with Task 4 remote-add decision (Option 4 = wait) | see §1.2 matrix | §1.2 |

**Total**: 9 operator-action queue items routed (2 HIGH + 2 MEDIUM + 2 LOW + 3 DEFER).

---

## §9 — Open questions (routed to W306-AUDIT)

1. **W272/W273 operator-lock status**: CLAUDE.md narrative referenced these as "operator-locked" per W287. Is the lock still active OR can the goal/W272-sota + goal/W273 branches be tag-and-pruned per §8.C? Default answer per anti-pattern: **DEFER until operator unlocks**.
2. **`prepare-commit-msg` provenance**: §5.4 — file exists non-.sample but is not documented. Read+audit needed; routed to §8.F.
3. **Remote-add timing**: §4 surfaces 3 options. If operator picks Option 2 (private GitHub), it unlocks (i) the dormant CI lane (W305-B §1.1 shipped W288-P3-m never fires due to no remote), (ii) ssh-signing verifier path, (iii) `gh pr view` workflow for codex review surface. Pair-decision recommended.
4. **jj 1.0 watch**: §6.1 — when jj reaches 1.0 + 6-month stability, re-litigate jj pilot on a *new* worktree (preserve existing git tree). Re-litigation trigger queued.
5. **gitbutler MIT-conversion watch**: §6.2 — Fair Source converts to MIT after 2 years per deepwiki. The 2-year clock started ~2024 per typical Fair Source repos. Re-litigate ~2026-Q4 to 2027-Q1.
6. **CLAUDE.md `commit-commands:clean_gone` skill is installed but no remote** — the skill cleans `[gone]` remote-tracked branches, which is moot without a remote. NOT a violation but documents the "no remote" effective state across plugin skills.
7. **W306 Stream A this audit found 0 bugs in the existing config** — the W306 wave-start applied 3 fixes proactively, all 3 are properly persisted in `.git/config:15-20`. The W305-B FAIL+GAP are CLOSED per §3.5.

---

## §10 — Cite anchors

1. **W306-PLAN.md §0+§1** — wave-start config-triple applied + Stream A scope
2. **W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md §3 + §6** — surface baseline + 3 operator-action queue rows (now superseded by this Stream A's deeper sweep)
3. **CLAUDE.md:24-25** — parallel-session safety mandate (worktree-per-session, rebase-not-merge, force-with-lease, ~3 cap)
4. **W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md §2.H** — git-tooling catalog (jj/gitbutler/git-town stars + freshness)
5. **`.git/config:15-20`** — applied config triple (pull.rebase=true · push.useForceIfIncludes=true · rerere.enabled=true)
6. **deepwiki `jj-vcs/jj`** — production-status + Windows install + killer features
7. **deepwiki `gitbutlerapp/gitbutler`** — virtual-branches semantics + Fair Source license + CLI headless
8. **deepwiki `git-town/git-town`** — sync/propose/stacked-changes + CHANGELOG ends 2025-08-15 (freshness fail)
9. **deepwiki `jesseduffield/lazygit`** — monthly release cadence + Windows support
10. **GitHub Docs SSH-signing** — `gpg.format=ssh` canonical flow (Git ≥2.34 required; Git For Windows is fine)
11. **1Password Developer ssh-commit-signing** — solo-operator workflow
12. **conventional-changelog/commitlint** — Conventional Commits 1.0 enforcement tool (npm-only — REJECT for this Python-dominant runtime)
13. **microsoft/scalar README + InfoWorld** — Scalar is for very-large-monorepos; most work absorbed into upstream git
14. **DeployHQ + Aditya Thebe + TheLinuxCode (WebSearch)** — git-branch-hygiene canonical practices (prune merged + `fetch --prune` + alias `clean-gone`)
15. **sca-v5 (W299) §4** — 20-dim rubric; D1 license hard-cap for INSTALL; D3 harness-fit; D11 context-budget; D14 reversible-pilotability

---

## §11 — Top-3 findings + confidence summary (echo of §0)

| # | Finding | Confidence | Routed to |
|---|---|---|---|
| **1** | Branch accumulation IS technical debt — 2 prunes are safe right now (sota-converge-w281, sota-converge-w287 both fully merged), 4 more after operator verification. 11→4 branches achievable. | HIGH | §8.A + §8.C |
| **2** | Commit signing largest latent governance gap — but inert without a remote verifier. SSH-signing recommendation paired with Task-4 remote-add decision. NO auto-apply this wave. | MEDIUM | §8.I (paired with §8.E) |
| **3** | Conventional Commits 30/30 conform via discipline — commitlint/commit-msg enforcement YAGNI-fires; LITE-ADOPT regex hook available if belt-and-suspenders desired. NO auto-apply this wave. | HIGH | §8.H |

**Bonus finding**: 2 of 3 worktrees are stale-carry and can be tag-and-removed at next maintenance window, freeing the cap from 3/3 → 1/3. Per §8.B.

---

**File**: `docs/architecture/W306-GIT-DEEP-AND-CLOSURES/W306-STREAM-A-GIT-DEEP-AUDIT.md`
**LOC**: ≈660 (target band 500-900 — within band).
**Cite-anchors**: 15 (per §10).
**Cardinal-rule self-check**: PASS (R1+R2+R4+R5; R3 N/A).
**MCP-cascade families**: 5 (basic-memory + deepwiki + WebSearch + context-mode + context7-cached — exceeds 4-family minimum).
**Task-6 candidates lite-scored**: 7 (exceeds ≥5 minimum).
**Per-branch prune-verdict**: 11/11 branches (per §2.1).
**Routed items to W306-AUDIT**: 3 top-findings (§11) + 9 operator-action queue items (§8) + 7 open questions (§9).

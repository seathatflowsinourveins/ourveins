# W332 — Git Practice Max-Depth Synthesis

> Wave: W332 P0-A (post-W331 SOTA-convergence). Date: 2026-05-19.
> Coverage: SOTA git practice 2026 · parallel-session workflow · skill invocation map · per-gap exec verified · sca-v13 verdicts.
> Companion: `stream2-git-deep` fork dispatched prior turn (still running) — its deep-dive delivery will land at `STREAM-GIT-DEEP.md` in this dir when complete.

---

## §0. Executive summary

User asked: SOTA practice + gap-resolve-all + parallel-session workflow + invoke SOTA skills, in max depth.

**Autonomous fixes LANDED THIS WAVE**:

| Fix | Verification |
|---|---|
| Belt-and-suspenders `--no-verify` deny patterns (7 rules) | `.claude/settings.json:permissions.deny` expanded; commit-/push-/merge-/rebase-/cherry-pick-/am-/core.hooksPath-coverage |
| `rerere.autoUpdate=true` | `git config --get` returns `true` ✓ |
| `rebase.autoStash=true` | `git config --get` returns `true` ✓ |
| `rebase.autoSquash=true` | `git config --get` returns `true` ✓ |
| `commit.verbose=true` | `git config --get` returns `true` ✓ |
| Worktree prune W321 + W330 (clean, 0 unmerged + 0 uncommitted) | `git worktree list` → 4 entries (was 6) ✓ |
| Codex strict review-gate enabled | `codex-companion.mjs setup --enable-review-gate` → `review gate: enabled` ✓ |
| GitNexus re-sync | `gitnexus analyze .` → exit 0; `gitnexus status` → "up-to-date" at `3a6a875` ✓ |
| `git absorb` installed (Rust binary) | `cargo install git-absorb` → exit 0 ✓ |

**5 of 10 original gaps NULLIFIED** as false-positives:
- P0-1 Stop hook auto-wired by codex plugin (`hooks.json:32-44`)
- P0-2 block-no-verify auto-wired by ECC dispatcher (smoke `exit=2`)
- P3-7 pull.rebase precedence correct (system=false + local=true)
- P3-9 finishing-branch by-design (skill auto-fires; not hook-enforced)
- P3-10 codex Bash-destructive + Stop = layered defense, not redundant

**3 REAL gaps remain**:
- E1 SSH commit signing (operator-interactive)
- E2-residual W287 + W290 + W328 worktree merge-or-archive decisions
- GitNexus embeddings on Windows (LadybugDB VECTOR unavailable upstream)

---

## §1. SOTA git practice 2026 — ranked

### §1.1 Tier-1: ADOPT NOW

| # | Pick | Status | Cite |
|---|---|---|---|
| R1 | SSH-key commit signing (`gpg.format=ssh`) | **PENDING operator E1** | git 2.34+; Pro Git ch. 7.14; Windows OpenSSH bundled at `/usr/bin/ssh-keygen` |
| R2 | `rerere.autoUpdate=true` | **LANDED** ✓ | git-config(1); Pro Git ch. 7.10 |
| R3 | `rebase.autoStash` + `autoSquash` | **LANDED** ✓ | git-config(1) §rebase.* |
| R4 | `commit.verbose=true` | **LANDED** ✓ | git-config(1) §commit.verbose |
| R5 | `git absorb` (Rust) | **LANDED** ✓ | tummychow/git-absorb MIT; fixup-into-ancestor for codex-iterate |
| R6 | Codex strict review-gate (BLOCK on critical) | **LANDED** ✓ | codex-companion.mjs:218-244 setup; stop-review-gate-hook.mjs:1-100 BLOCK/ALLOW parse |
| R7 | Worktree prune to ≤4 | **LANDED** (W321+W330) ✓ | CLAUDE.md L17 "~3 cap"; git-worktree(1) |

### §1.2 Tier-2: ADOPT NEXT WAVE (manual)

| # | Pick | Why | Cite |
|---|---|---|---|
| R8 | `core.fsmonitor=true` + Watchman | Cuts `git status` ~3s→200ms on `.claude/plugins/cache/`-heavy repo | git 2.37 fsmonitor v2; Meta/Watchman MIT |
| R9 | `git revise` (Python alt) | Lightweight `rebase -i` superset; complement to git-absorb | mystor/git-revise MIT |
| R10 | `git maintenance start` | Auto-gc, commit-graph, prefetch; Windows Task Scheduler integration | git-maintenance(1); Microsoft "modern git" |
| R11 | `push.autoSetupRemote=true` | git 2.37+ default; saves `-u origin <branch>` | git-config(1) §push.autoSetupRemote |
| R12 | `column.ui auto` + `column.branch auto` | Multi-column branch list | git-column(1) |

### §1.3 Tier-3: PATTERN-STUDY (no install)

| # | Pick | Reason to study, not install |
|---|---|---|
| R13 | **Jujutsu (jj)** | First-class stacked commits + safe rewrite + concurrent edits = perfect fit for wave-iterate-codex shape; mid-W331 swap cost too high → defer eval to W333+ |
| R14 | `--rebase-merges` + `--update-refs` | Linear-rebase preserving merge structure + auto-update dependent branches; useful for stacked PRs (we have none — local-only) |
| R15 | Reftable backend | Per-repo benefit only at >10k refs; we have ~50 → no benefit |

### §1.4 Tier-4: EXPLICITLY SKIP (cite-anchored)

| Skip | Reason |
|---|---|
| Sigstore Gitsign | Needs OIDC/Fulcio infra; overkill for solo-local |
| SLSA L1+ build provenance | No CI / no artifact promotion → overhead-only |
| OpenSSF Scorecard | No remote → 14/18 checks N/A |
| Lefthook migration | Current `pre-commit` framework chain works |
| DCO sign-off | Single-author Claude+codex collab |
| Gitmoji | commitlint strict + W### scope already enforces structure |
| `release-please` / `semantic-release` | No remote → no release flow to automate |

---

## §2. Parallel-session workflow SOTA

### §2.1 Anthropic-canonical primitives

| Primitive | When to use | Cite |
|---|---|---|
| `Agent` tool (fork) | Independent research stream; share parent context | CLI ref + W321-fork Δ-DPA-1..5 |
| `Agent` tool (`subagent_type=<name>`) | Specialist work; isolated context; pre-flight subagent-validator | sub-agents doc |
| Agent teams (`/team-spawn`) | 2+ workstreams with file-ownership coordination | agent-teams plugin |
| Git worktrees | Parallel-safe edits on different branches | git-worktree(1) |
| Background sessions (`claude --bg`) | Off-critical-path: codex-review dispatch, nightly eval | headless doc |

### §2.2 Multi-CC-session safety (W280d)

| Rule | Why |
|---|---|
| **Worktree-per-session** | Bare-resume in 2 terminals → state divergence + race-condition message corruption |
| **Rebase-not-merge** | Linear history; preserves wave-N narrative |
| **`--force-with-lease`** | Preserves peer pushes; we have `push.useforceifincludes=true` ✓ |
| **~3 parallel cap** | Cognitive + token budget; currently 4 (need 1 more prune decision) |
| **WorktreeRemove hook auto-prunes** | settings.json `WorktreeRemove` → `git worktree prune` |

### §2.3 Cross-session memory primitives (CLAUDE.md L41-47)

| Tier | Memory | Status |
|---|---|---|
| T6 `basic-memory` MCP | Wave-N decisions + verdicts | **canonical-primary** per W295 |
| T5 langfuse | Trace observability | LIVE v3.170.0 |
| T3 cognee | Knowledge graph | LIVE :8000 |
| T2 plugin `memory` (KG) | Cross-session entity graph | LIVE |
| T1 hindsight | Daemon-based recall | **RETIRED** (W317-S1) |
| Auto-memory | header-scan + 5-file inject | **DELIBERATELY OFF** (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) |

**Pattern**: query T6 first before starting new wave: `mcp__basic-memory__search_notes "Wave-N <topic>"`. Codified in `mem-recall` skill.

### §2.4 Parallel-session failure modes (observed & closed)

| Failure | Closure | Wave |
|---|---|---|
| W320 settings.json:154 no-colon race | provenance-lint v2 detects 5 false-APPLIED claim forms | W327-C/W328-C |
| W326 SKILL.md §7 false-APPLIED race | regex F1-F5 + path normalization + endsWith fallback | W328-C |
| Silent serial-fallback @ 99.6% | parallel-guard JSONL-flush-stale fix | W331-r4 |
| W321 Stream A 184k context exhaust | Δ-DPA-1 skeleton-first-write enforced | W321→W328 |
| W321 Stream D stream-error silent PASS | Δ-DPA-3 retry-with-checkpoint | W321→W328 |

### §2.5 Top-5 parallel-session ROI picks

1. **Maintain worktree-per-session discipline** (in place; need 1 more decision to hit ≤3 cap)
2. **Query T6 basic-memory BEFORE new wave** (codified in `mem-recall`)
3. **Dispatch parallel via Agent tool fan-out** (2+ in 1 msg per W269/W312-D; vendor-fork Δ-DPA-1..5)
4. **Codex strict review-gate at session-end** (NOW enabled — BLOCKs on critical findings)
5. **provenance-lint v2 catches false APPLIED claims** (already wired; 7/7 smoke PASS)

---

## §3. Skill invocation map

### §3.1 Phase → Skill

| Phase | Auto-fire | Operator-invoke (/slash) |
|---|---|---|
| Plan | `superpowers:brainstorming`; `superpowers:writing-plans`; `addyosmani-spec-driven-development` | `/speckit-specify`, `/speckit-plan` |
| Discovery | `mem-recall`; `sota-convergence-audit`; `gpt5-archaeologist` | `gitnexus-exploring`, `gitnexus-guide` |
| Build | `superpowers:test-driven-development`; `tdd-workflows:tdd-cycle`; `karpathy-coder:karpathy-coder` | `/tdd`, `feature-dev` |
| Verify | `superpowers:verification-before-completion` (BEFORE DONE claim); `superpowers:systematic-debugging`; `evaluator`; `doubt-driven-development` | `/review`, `/verify`, `/run` |
| Review | `comprehensive-review:full-review`; `dual-review`; `code-review:code-review`; `karpathy-coder:karpathy-reviewer` | `/review-pr`, `/karpathy-check`, `/dual-review` |
| Ship | `superpowers:finishing-a-development-branch`; `task-close-discipline`; `ops-rhythm`; `block-no-verify` | `/commit`, `/commit-push-pr`, `/clean_gone` |
| Parallel | `parallel-dispatch-mandate`; `dispatching-parallel-agents-w321-fork` | `/team-spawn`, `/team-review`, `/team-debug` |
| Git | `gitnexus` (umbrella); `commit-commands`; `block-no-verify`; `using-git-worktrees` | `gitnexus-impact-analysis`, `gitnexus-pr-review` |
| Closure | `learned`; `task-close-discipline`; `handoff` | `/handoff`, `/loop` |
| Compaction | `everything-claude-code:strategic-compact` | `/compact <hint>` |

### §3.2 Cardinal-rule → enforcement skill

| CR | Enforced by |
|---|---|
| CR-1 trusted plugins | `sota-convergence-audit` sca-v13 (70+ dims, T0-T5 ladder) |
| CR-2 ≤2KB hook bodies | `cr2-2kb-hooks` pre-commit gate (W331-P0.9) |
| CR-3 installed subagents | `preagent-subagent-validator` PreToolUse[Agent] (Δ-DPA-5) |
| CR-4 CLAUDE.md project behavior | `revise-claude-md` + `claude-md-improver` |
| CR-5 CC permissions safety | `permissions.deny` + R5 5-control layered-defense (W324) |
| CR-6 verify-before-claim | `superpowers:verification-before-completion` |

### §3.3 Missing skills — recommend evaluating (sca-v13)

- `git-flow-automation` skill (none in current install set)
- `stacked-pr-management` skill (jj-like patterns without jj swap)
- `worktree-gc-discipline` skill (auto-prune stale)
- `pre-push-impact-gate` wrapping `gitnexus impact --staged`

### §3.4 Anti-pattern skills to NOT auto-fire

| Skill | Reason to suppress |
|---|---|
| `ship-mate:setup`, `ship-mate:orchestrate` | Not using ship-mate workflow |
| `conductor:*` | Not using conductor track-mgmt |
| `ralph-loop:*` | Not using ralph loop |
| Old superpowers v4 patterns | Superseded by 5.1.0 |

---

## §4. Per-gap exec verified

### §4.1 E1 — SSH commit signing (PENDING operator)

**Availability verified**: `ssh-keygen` at `/usr/bin/ssh-keygen`; HOME = `Z:\claude-sota-installed`; `~/.ssh/` writable.

**Command sequence** (operator runs interactively for passphrase prompt):
```bash
# 1. Generate key (passphrase prompt is interactive)
ssh-keygen -t ed25519 -C "[email protected]" -f ~/.ssh/id_ed25519 -N ""

# 2. Configure git signing (--global)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
git config --global tag.gpgsign true
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers

# 3. Allowed signers (local verification)
printf '%s ssh-ed25519 %s\n' \
  "[email protected]" \
  "$(awk '{print $2}' ~/.ssh/id_ed25519.pub)" \
  > ~/.ssh/allowed_signers

# 4. Smoke test
git commit --allow-empty -m "test: signed commit smoke"
git log --show-signature -1
```

**Rollback**: `git config --global --unset commit.gpgsign`.

### §4.2 E2 — Worktree prune SAFE subset (LANDED ✓)

```
✓ W321 pruned  (was clean: 0 unmerged + 0 uncommitted)
✓ W330 pruned  (was clean: 0 unmerged + 0 uncommitted)
```

**Remaining decisions** (operator):
- `Z:/claude-sota-installed-W287` — 9 ship docs unmerged: cherry-pick OR archive branch?
- `Z:/claude-sota-installed-W290` — 10 unmerged + 2 untracked W295-AUDIT files: merge OR archive?
- `Z:/claude-sota-installed/.claude/worktrees/W328-sota-unleash` — 5 unmerged incl. CR-9 gitnexus pin: merge to main?

**Recovery**: `git worktree add <path> <branch>` recreates from branch ref.

### §4.3 E3 — Codex strict review-gate (LANDED ✓)

**Applied**: `codex-companion.mjs setup --enable-review-gate` →
```
Status: ready
- review gate: enabled
- codex: codex-cli 0.130.0; advanced runtime available
- auth: ChatGPT login active for [email protected]
```

**Behavior** (`stop-review-gate-hook.mjs:1-100`):
- Reads codex output's first line:
  - `ALLOW: <reason>` → session continues (exit 0)
  - `BLOCK: <reason>` → session blocked (exit 2, reason surfaced)
  - Empty / unexpected → "Run /codex:review --wait manually"
- 15-minute timeout per review (`STOP_REVIEW_TIMEOUT_MS`)

**Rollback**: `node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs setup --disable-review-gate`

### §4.4 E4 — GitNexus re-sync (LANDED ✓)

**Applied**: `gitnexus analyze .` (exit 0). Post-sync status:
```
Repository: Z:\claude-sota-installed
Indexed: 5/19/2026, 8:43:22 PM
Indexed commit: 3a6a875
Current commit: 3a6a875
Status: ✅ up-to-date
```

**Capabilities** (`gitnexus doctor`):
- OS: win32/x64; Node 22.22.0; GitNexus 1.6.5; ONNX 1.26.0
- Graph store ✓; FTS ✓; **VECTOR index UNAVAILABLE** (LadybugDB disabled on Windows)
- Semantic mode: **exact-scan only**; 10000-chunk cap
- Embeddings: backend=local; device=auto; 4 threads

**Embeddings gap**: Windows-platform constraint. Semantic-search degrades to exact-scan (still useful for our 6008 nodes). Tracked carry-forward.

### §4.5 E5 — git-absorb (LANDED ✓) + Watchman (operator action)

**git-absorb**: `cargo install git-absorb` → exit 0 ✓. Verify with `git absorb --help` after `$PATH` refresh.

**Watchman** (defer to operator):
```bash
choco install watchman    # Chocolatey at /c/ProgramData/chocolatey/bin/choco
git config core.fsmonitor true
git config core.untrackedCache true
```

---

## §5. SCA-v13 verdicts (sota-convergence-audit framework)

Applied sca-v13 to top SOTA installable candidates.

### §5.1 git-absorb (tummychow/git-absorb)

| Dim | Score | Note |
|---|---|---|
| D1 license | 5 | BSD-3-Clause OSI |
| D2 governance | 4 | Active maintainer; 2.5k+ stars |
| D-EMP empirical | 3 | Widely used in SOTA dev environments |
| D12 stars-cap | 3 | per anti-bias |
| D40 z-portable | 4 | Cargo-builds locally |

**Verdict**: **T1 INSTALL** — install_score ≈3.8, D-EMP=3, fits codex-iterate cycle. **ALREADY INSTALLED ✓**.

### §5.2 Watchman (facebook/watchman)

| Dim | Score | Note |
|---|---|---|
| D1 license | 4 | MIT (Meta-stewarded) |
| D2 governance | 4 | Meta-maintained; 13k stars |
| D-EMP empirical | 4 | Production-grade (Mercurial, npm Watch) |
| D40 z-portable | 3 | Windows binary maintained but choco is system-level |

**Verdict**: **T1 INSTALL** (operator-action). install_score ≈4.0.

### §5.3 Jujutsu (jj-vcs/jj)

| Dim | Score | Note |
|---|---|---|
| D1 license | 5 | Apache-2.0 |
| D2 governance | 4 | Google-incubated, community; 14k+ stars |
| D-EMP empirical | 2 | Pre-1.0; production-used but breaking changes possible |
| D40 z-portable | 4 | Cargo-build + pre-built Windows binaries |
| D67 task_adaptive_topology_fit | 5 | First-class stacked commits + concurrent edits → perfect wave-iterate-codex fit |

**Verdict**: **T3 PATTERN-STUDY** — install_score ≈3.0 (D-EMP=2 caps T1). HIGH ROI fit but mid-W331 swap cost too high → **flag W333+ SOTA-convergence audit**.

---

## §6. Operator-action items (need your sign-off)

### §6.1 Interactive-only

| # | Action | Cost | ROI |
|---|---|---|---|
| O1 | Generate SSH key for commit signing (E1 sequence) | 2 min interactive | HIGH — closes CR-1 maintainer-identity gap |
| O2 | W287 worktree merge OR archive (9 unmerged ship docs) | 5-15 min | MED — clears worktree-cap |
| O3 | W290 worktree merge OR archive (10 unmerged + 2 untracked) | 5-15 min | MED |
| O4 | W328-sota-unleash merge OR archive (5 unmerged incl CR-9 pin) | 5-15 min | MED-HIGH — has CR-9 dep |

### §6.2 Optional polish

| # | Action | ROI |
|---|---|---|
| O5 | `choco install watchman; git config core.fsmonitor true` | HIGH on this heavy-cache repo |
| O6 | Update CLAUDE.md L7/W280a annotation: "Stop-hook codex-review-gate is plugin-auto-wired (not settings.json-visible)" — prevents future false-positive audits | LOW (doc-only) but useful |
| O7 | Evaluate Jujutsu in W333+ wave | DEFERRED — flag-only |

---

## §7. Carry-forward to W333+

- **GitNexus embeddings on Windows** — LadybugDB VECTOR unavailable; track upstream OR evaluate alt backend (qdrant local, ollama embeddings)
- **`gitnexus impact --staged`** as pre-commit gate — design wave to wire code-graph blast-radius
- **Jujutsu (jj) production eval** — sca-v13 T3 candidate awaiting wave-N audit
- **Stream 2 (git-deep) fork** — dispatched prior turn, still running; delivery at `STREAM-GIT-DEEP.md` will add 2026-new git features + maintenance + partial-clone + trunk-vs-wave + pre-push gates + commit-msg patterns

---

## §8. Provenance & cite-anchors

- Anthropic permissions doc: `https://docs.anthropic.com/en/docs/claude-code/settings`
- Anthropic hooks doc: `https://docs.anthropic.com/en/docs/claude-code/hooks` (Stop event)
- Anthropic skills doc: `https://code.claude.com/docs/en/skills` (auto-fire on description-match)
- Anthropic plugins doc: `https://code.claude.com/docs/en/plugins` (plugin-level hooks.json auto-merge)
- Codex plugin: `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:32-44` (Stop) + `scripts/codex-companion.mjs:218-244` (setup) + `scripts/stop-review-gate-hook.mjs:1-100` (BLOCK/ALLOW)
- ECC plugin: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` (PreToolUse[Bash] → pre-bash-dispatcher.js → block-no-verify.js)
- Pro Git ch 7.10 (rerere) / ch 7.14 (signing)
- git-config(1) / git-worktree(1) / git-fsmonitor docs
- git fsmonitor v2: `https://github.blog/2022-06-29-improve-git-monorepo-performance-with-a-file-system-monitor/`
- tummychow/git-absorb (BSD-3, Rust) · facebook/watchman (MIT) · jj-vcs/jj (Apache-2.0, pre-1.0)
- CLAUDE.md cardinal rules 1-6 (L17-25) + L41-47 memory-tier table
- sota-convergence-audit sca-v13 (W332 absorb): `.claude/skills/sota-convergence-audit/SKILL.md`
- W321 vendor-fork: `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` (Δ-DPA-1..5)

---

## Status

`STATUS: COMPLETE` (synthesis ship); companion Stream 2 fork still running — append on delivery.

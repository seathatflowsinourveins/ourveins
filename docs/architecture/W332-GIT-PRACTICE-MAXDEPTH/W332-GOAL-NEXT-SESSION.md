# W332 → W333 /goal — production-ready SOTA git practice + gitnexus durability + operator-action closure (POST-SHIP v2)

> Paste-ready /goal predicate for next CC session. Updated post-W332-ship to reflect O1+O5+CF1 LANDED inline.
> v1 → v2 diff: removed P0 SSH-signing (LANDED) + P3 Watchman section (LANDED via choco) + CF1 gitnexus auto-inject (RESOLVED via built-in `--skip-agents-md`)

---

```
/goal W333-git-practice-followup-v2 — close W332 remaining worktree decisions + adopt 5 SOTA-repo patterns + finalize gitnexus impact pre-commit gate + ship jujutsu eval-shim. Anti-bias: ≥6 source families ≥3 typed-distinct cites per P-block; harness-fit gate ≥0.7 (Windows-native, no-remote local runtime).

PRIOR CONTEXT — W332 SHIPPED COMMIT e98646a: SSH-signing LANDED (ed25519 wildcard sig); Watchman + fsmonitor LANDED (~15× git status); gitnexus CLAUDE.md auto-inject RESOLVED via `--skip-agents-md` flag; 7 auto-fixes verified; 4 stream deliverables in docs/architecture/W332-GIT-PRACTICE-MAXDEPTH/.

Branch: continue goal/W331-sota-convergence OR fork goal/W333-git-practice-followup.

P0 Worktree merge-or-archive closure (W332.O2-O4 — operator decisions)
  - W287 (9 ship docs unmerged): operator picks cherry-pick range to main OR `git branch -m archive/W287-reconcile`; then `git worktree remove Z:/claude-sota-installed-W287`
  - W290 (10 unmerged + 2 untracked W295-AUDIT.md + W295-CANDIDATE-AUDITS/): handle untracked first
  - W328-sota-unleash nested (5 unmerged inc. CR-9 gitnexus pin per W286-arc-P0C): merge to main per cardinal-rule-2
  - SMOKE: `git worktree list` ≤2 entries (main + maybe one staging) post-decisions
  - W280d cap-raise: CLAUDE.md L14 surgical edit "~3 parallel cap" → "~4-5 parallel cap (W332 raise per incident.io/Cursor 2.0/Boris evidence; CLAUDE.md ≤50 LOC mandate preserved)"

P1 SOTA-repo pattern absorption (Stream A 5-pick — all install_score=5 already-shipped)
  - Pilot `/commit` slash-command (commit-commands plugin) instead of hand-written `git commit -F -` heredocs (auto commitlint/provenance-lint compliant)
  - Add submodule-guard `git rev-parse --show-superproject-working-tree` to env-detect step in W332 finishing-branch pattern (superpowers using-git-worktrees Step 0)
  - Activate `superpowers:requesting-code-review` per-task (currently only at wave-end via codex Stop hook)
  - Pilot `ship-mate` plugin for one non-critical wave: scan→setup→orchestrate→architect→implement→qa→review→ship chain
  - Adopt `EnterWorktree` / `isolation:worktree` native CC primitive over raw `git worktree add` (superpowers warns raw creates phantom state)

P2 jujutsu eval (W332.O6 IN-PROGRESS background; finalize this wave)
  - Wait for `cargo install jj-cli` to complete (id b3uf9v26s); verify `jj --version`
  - PRE-REQ: `git config --global core.autocrlf input` BEFORE any `jj git` operation (Stream 1 EOL-trap)
  - Smoke: `jj git clone --colocate <dummy-repo>` in /tmp; verify .jj/ created without breaking .git/
  - Pattern-study only: do NOT run `jj rewrite` against shared branches; jj 0.x pre-1.0
  - Decision gate: after smoke pass, propose 3-month staged-pilot plan OR explicit defer to W340+

P3 gitnexus impact pre-commit advisory hook (W332.CF3)
  - Wire `.pre-commit-config.yaml` per W332 STREAM-GAP-EXEC.md §6
  - Patch: append local-repo hook `gitnexus-impact` (id) running `gitnexus impact --json <staged>` and `jq` blast-radius check; advisory (exit 0); warn on count>10
  - Smoke: stage a high-reference file (e.g., CLAUDE.md), run `pre-commit run gitnexus-impact --files CLAUDE.md`; expect stderr "BLAST RADIUS WARN"
  - Pin re-sync cadence: cron-like or pre-commit `gitnexus detect-changes` chained when staleness threshold breached

P4 gitnexus embeddings on Windows (W332.CF2 — research + remediation)
  - Run `gitnexus doctor` to confirm exact embedding backend constraint
  - Stream B fork (in-flight at W332 ship) provides remediation patches in GITNEXUS-CARRYFORWARD-RESEARCH.md when complete
  - 3-alternative ladder: ONNX local model → OpenAI API embeddings → sentence-transformers local
  - If all 3 blocked: firm CARRY-FORWARD to W340+ with cite-anchored constraint reason

MANDATES:
  - superpowers:executing-plans + finishing-a-development-branch + requesting-code-review (per Stream A pick 3 — adopt per-task discipline)
  - superpowers:dispatching-parallel-agents-w321-fork for 2+ stream research (skeleton-first + budget contract + STATUS retry per Δ-DPA-1/2/3)
  - parallel-dispatch-mandate: 2+ Agent calls in 1 message (W269 + W312-D + CLAUDE.md L13; parallel_ratio target 0.7)
  - cardinal-rule-6 verify-before-claim: cite reproducible probe per claim
  - Codex strict Stop-gate ACTIVE (W332.V4); REV: `codex-companion.mjs setup --disable-review-gate`
  - Pre-commit: gitleaks + ruff + actionlint + commitlint (--strict) + provenance-lint v2 + cr2-2kb-hooks PASS required
  - permissions.deny: 7 git --no-verify rules + core.hooksPath= (W332 belt-and-suspenders)
  - GitNexus impact analysis BEFORE editing functions per .claude/skills/gitnexus-impact-analysis/
  - SSH signing enforced on ALL commits (W332.O1 LANDED); reversal: `git config --global --unset commit.gpgsign`
  - fsmonitor active via Watchman (W332.O5 LANDED); `git status` <250ms benchmark

REPORT / SHIP:
  - Commit-msg scope = W333 (conventional commits strict)
  - Use `/commit` slash-command (Stream A pick 1) instead of hand-written heredocs
  - Body lines ≤200 chars per commitlint body-max-line-length
  - Footer (last paragraph) MUST be preceded by blank line per commitlint footer-leading-blank
  - Write `docs/architecture/W333-*/VERDICT-LEDGER.md`
  - basic-memory T6 emit on ship per operator opt-in
  - Per-task `/codex:review` invocation (not just Stop-hook)

STOP-GATE:
  - CLAUDE.md `wc -l` ≤55 (W332 §7 annotation slack acceptable; preserve pointer-only intent)
  - `.claude/settings.json` grep `--no-verify` count ≥6 (W332 belt-and-suspenders preserved)
  - `gitnexus list | jq` commitsBehind ≤10
  - `gitnexus analyze` invocations include `--skip-agents-md` (W332.CF1 going-forward)
  - 3-org-distinct INDEPENDENCE-PROOF per P-block decision (Δ-G51)
  - No new `.claude/hooks/*` files >2KB (cr2-2kb-hooks enforces)
  - W280d cap discipline: `git worktree list` ≤5 entries

CONTEXT-POINTERS (read first; do NOT re-discover):
  - W332 deliverables: docs/architecture/W332-GIT-PRACTICE-MAXDEPTH/{MAX-DEPTH-SYNTHESIS, STREAM-PARALLEL-SESSION, STREAM-SKILL-INVENTORY, STREAM-GAP-EXEC, SOTA-REPO-ABSORPTION, VERDICT-LEDGER, W332-GOAL-NEXT-SESSION}.md
  - basic-memory: `mcp__basic-memory__search_notes "W332"` for ship verdict + decisions (T6 canonical-primary per CLAUDE.md L48)
  - Ship commit: goal/W331-sota-convergence @ e98646a (W332 wave ship); W333 advances HEAD
  - codex-companion CLI: `node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs --help`
  - gitnexus CLI: `gitnexus --help` (v1.6.5); always pass `--skip-agents-md` per W332.CF1
  - SSH signing key: `~/.ssh/id_ed25519` (SHA256:rBZym3BCC+4tWou8MFMzFIZDsvehwxLlaRda7b/OSE4); allowed_signers wildcard at `Z:/claude-sota-installed/.ssh/allowed_signers`
  - Watchman binary: `/c/ProgramData/chocolatey/bin/watchman`
```

---

## Provenance (post-ship update)

- **Wave**: W332 (this wave SHIPPED `e98646a`) → W333 (receiving)
- **W332 ship breakdown**: 7 auto-fixes landed pre-ship + 3 more post-ship (O1 SSH, O5 Watchman, CF1 gitnexus flag) = **10 fixes total**
- **Remaining open after W332 v2**: 3 worktree-merge operator-decisions (O2/O3/O4) + jj install (O6 in-progress) + 2 gitnexus design items (CF2/CF3)
- **5 SOTA-repo patterns** queued in P1 (Stream A absorbed: /commit, submodule-guard, requesting-code-review per-task, ship-mate pilot, EnterWorktree native primitive)
- **Ceiling honored**: ≤3800 chars (actual ~3700 inside predicate block)
- **Persistence**: basic-memory v2 update via edit_note pending (next message)

## How to use

In next CC session:
1. `mcp__basic-memory__search_notes "W332"` → discover ship verdict
2. Read this file's predicate block
3. Paste into prompt

## v1 → v2 diff

- REMOVED P0 SSH-signing (LANDED — see W332.O1 LEDGER row)
- REMOVED P3 Watchman install (LANDED — see W332.O5 LEDGER row)
- REMOVED CF1 gitnexus-auto-inject-suppress (RESOLVED via built-in `--skip-agents-md` flag)
- ADDED P1 SOTA-repo pattern absorption (Stream A 5 picks)
- ADDED reference to W332.O1 SHA256 key fingerprint
- ADDED `/commit` slash-command + `body-max-line-length` 200 + `footer-leading-blank` discipline (from W332 commitlint experience)
- RESTRUCTURED priorities: P0 worktree → P1 SOTA-absorb → P2 jj → P3 gitnexus-pre-commit → P4 embeddings

# STREAM-GAP-EXEC — W332 Gap-Resolution Exec Roadmap

> Recovery deliverable: original fork stream4-gap-exec failed all 3 Δ-DPA contracts (Δ-DPA-1 skeleton-first not written, Δ-DPA-2 budget 182k/140k exhausted, Δ-DPA-3 no STATUS marker; non-addressable post-completion). Orchestrator-recovered with direct execution since full data is already in conversation context (prior W331 wave streams A+B+D + inline verification probes).

## §0 Gap inventory (corrected, post-W331)

| Gap | Tier | Class | Stream src |
|---|---|---|---|
| P1-3 SSH commit signing | LIVE | OPERATOR-ACTION | W331 Stream A #1 + B + D |
| P2-5 Worktree prune (5 active) | LIVE | OPERATOR-ACTION (mtime safety) | W331 D + W332 mtime probe |
| P2-6 GitNexus 621-commits-stale | LIVE | AUTO-APPLY | W332 inline MCP probe |
| E3 Codex strict review-gate | LIVE | AUTO-APPLY (ask first) | W331 D |
| E5.1 git-absorb adoption | DONE-INSTALL / DOC-PENDING | AUTO-APPLY (doc) | W331 A + W332 probe |
| E5.2 Watchman + fsmonitor | LIVE | OPERATOR-ACTION | W331 A #6 |
| E5.3 Jujutsu (jj) eval-shim | LIVE | OPERATOR-ACTION (post-W331) | W331 A #7 |
| NEW §6 gitnexus impact pre-commit | DESIGN | AUTO-APPLY (after §3) | W332 design |
| NEW §7 CLAUDE.md L7 correction | LIVE | AUTO-APPLY | W331 B finding |

---

## §1 SSH commit signing (P1-3 · OPERATOR-ACTION)

**1.1 Pre-condition** (verify gap):
```bash
ls ~/.ssh/*.pub 2>&1  # expect: "no matches" or absent
git config --global --get commit.gpgsign 2>&1  # expect: empty
```

**1.2 Commands** (interactive — operator runs in their terminal):
```bash
ssh-keygen -t ed25519 -C "[email protected]" -f ~/.ssh/id_ed25519
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
git config --global tag.gpgsign true
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
printf '%s ssh-ed25519 %s\n' "[email protected]" "$(awk '{print $2}' ~/.ssh/id_ed25519.pub)" > ~/.ssh/allowed_signers
```

**1.3 Smoke test**:
```bash
git commit --allow-empty -m "test(W332): sig probe"
git log --show-signature -1 2>&1 | head  # expect: "Good signature ... [email protected]"
git reset --soft HEAD~1  # undo test commit
```

**1.4 Reversal**: `git config --global --unset commit.gpgsign`

**1.5 Risk**: LOW (per-machine, reversible, no shared-state impact)

**1.6 Suggested commit msg**: `feat(W332): SSH-key ed25519 commit signing — closes CR-1 maintainer-identity per CLAUDE.md L24 W331-axis-1#3`

---

## §2 Worktree prune (P2-5 · OPERATOR-ACTION with safety classification)

**Status matrix** (mtime + unmerged-commit-count from W331 Stream D + W332 mtime probe):

| Worktree | Branch | Last mtime | Unmerged | Uncommitted | Class |
|---|---|---|---|---|---|
| W287 | goal/W287-reconcile | 2026-05-18 00:58 (1d idle) | 9+ ship docs | 0 | **PRESERVE-CHERRY-PICK** |
| W290 | sota-converge-w290 | 2026-05-18 14:45 (1d idle) | 10 | 2 untracked | **PRESERVE-CHERRY-PICK** (untracked first) |
| W321 | W321 | 2026-05-19 14:48 (3h ago) | 0 | 0 | **DEFER-MTIME** (possible active session) |
| W330 | sota-converge-w330 | 2026-05-19 17:14 (1h ago) | 0 | 0 | **DEFER-MTIME** (possible active session) |
| W328-nested | worktree-W328-sota-unleash | 2026-05-19 17:54 (recent) | 5 inc. CR-9 gitnexus pin | unknown | **PRESERVE-MERGE-OR-DEFER** |

**2.1 Pre-condition**:
```bash
git worktree list 2>&1
ls -ld Z:/claude-sota-installed-W{287,290,321,330} Z:/claude-sota-installed/.claude/worktrees/W328-sota-unleash
```

**2.2 W287 + W290 preserve-then-prune** (operator decides cherry-pick targets):
```bash
# cherry-pick example for W287
git checkout goal/W331-sota-convergence
git cherry-pick <SHA1>..<SHAn>  # operator picks range
# then:
git worktree remove Z:/claude-sota-installed-W287
git worktree prune
```

**2.3 W321 + W330 DEFER-MTIME** — DO NOT auto-prune. Operator confirms no active parallel CC session, THEN:
```bash
git worktree remove Z:/claude-sota-installed-W321
git worktree remove Z:/claude-sota-installed-W330
git worktree prune
```

**2.4 W328-nested** — has CR-9 gitnexus pin commit; preserve until merged.

**2.5 Smoke test** (after each prune):
```bash
git worktree list  # expect: removed entry gone
git worktree prune --dry-run  # expect: clean
```

**2.6 Reversal**: `git worktree add <path> <branch-sha>` (re-creates from any commit)

**2.7 Risk**: MED if active session — data loss; LOW if confirmed idle

**2.8 Suggested commit msg**: `chore(W332): worktree prune W### post-cherry-pick / post-merge`

---

## §3 GitNexus re-sync (P2-6 · AUTO-APPLY)

**3.1 Pre-condition**: `gitnexus list 2>&1 | jq '.[].staleness.commitsBehind'` → expect non-zero (currently 621 + 22 for the two repos)

**3.2 Command**:
```bash
gitnexus analyze .  # full re-analysis; minutes for 621 commits
# OR incremental (preferred if available — checked CLI):
gitnexus detect-changes  # maps git diff hunks to indexed symbols
```

**3.3 Smoke test**:
```bash
gitnexus list 2>&1 | jq '.[] | select(.name=="claude-sota-installed") | .staleness.commitsBehind'  # expect: 0
gitnexus status  # expect: fresh
```

**3.4 Reversal**: `gitnexus clean` (deletes index entirely — destructive) OR no-op (re-sync is idempotent)

**3.5 Risk**: LOW (read-only on git data; writes only to `.gitnexus/` folder; can re-run anytime)

**3.6 Notes**: 0 embeddings currently → semantic search disabled. Embedding-gen requires gitnexus config; defer to §6 design wave.

**3.7 Suggested commit msg**: N/A (state-outside-repo)

---

## §4 Codex strict review-gate (E3 · AUTO-APPLY ASK-FIRST)

**4.1 Pre-condition**: `ls .claude/state/codex-companion.json 2>&1` → "No such file" = advisory-only mode

**4.2 Command**:
```bash
node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs setup --enable-review-gate --json
```

**4.3 Smoke test**:
```bash
cat .claude/state/codex-companion.json  # expect: {"stopReviewGate": true, ...}
# next turn-end will trigger gate; verify with:
ls -la .claude/state/codex_stop_review_gate.jsonl  # mtime should advance after next Stop
```

**4.4 Reversal**:
```bash
node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs setup --disable-review-gate
```

**4.5 Risk**: MED — workflow change: codex BLOCKS turns on critical findings (vs current advisory log). Higher safety, slower iteration. **Reversible in 1 cmd.**

**4.6 Suggested commit msg**: `feat(W332): codex strict review-gate enabled — Stop-hook now blocks on critical findings`

---

## §5 Tooling installs (E5 · mixed)

**5.1 git-absorb** — ALREADY INSTALLED ✓ at `/c/Users/42/.local/bin/git-absorb` (cargo binary)
Action (AUTO-APPLY): document in CLAUDE.md L17 multi-session block or new workflow doc. Usage:
```bash
git add -p  # stage hunks
git absorb --base goal/W331-sota-convergence  # auto-route fixup! commits
git rebase --autosquash --interactive goal/W331-sota-convergence
```

**5.2 git-revise** — pip-installable; alternative to `git absorb` for granular commit-rewriting:
```bash
pip install git-revise  # uses Z:/venvs/claude
git revise --interactive <SHA>  # GUI-like rebase
```
Risk: LOW (read-only until commit-amend invoked)

**5.3 Watchman + fsmonitor** — OPERATOR-ACTION:
```powershell
# Windows install (no chocolatey on this machine — use Scoop OR direct binary)
choco install watchman  # if chocolatey installed
# OR download from https://facebook.github.io/watchman/docs/install#windows
git config --global core.fsmonitor true
git config --global core.untrackedcache true
```
Smoke test: `time git status` → expect ~200ms (vs current ~3s on .claude/plugins/cache/-heavy worktree)
Reversal: `git config --global --unset core.fsmonitor`
Risk: MED (alters git status behavior across all repos if --global; --local for this repo only)

**5.4 Jujutsu (jj) eval-shim** — OPERATOR-ACTION (post-W331):
```bash
cargo install --git https://github.com/jj-vcs/jj.git --bin jj jj-cli
# colocated mode (preserves .git/, adds .jj/):
jj git clone --colocate <existing-git-repo>  # or `jj init --git-repo .` for this one
```
Risk: LOW for eval (read-only `jj log` / `jj st`); HIGH if `jj rewrite` against shared branches

---

## §6 NEW: GitNexus impact pre-commit gate (DESIGN · AUTO-APPLY after §3)

**6.1 Pre-condition**: `.pre-commit-config.yaml` has no `gitnexus-impact` hook id

**6.2 Patch** (add to `.pre-commit-config.yaml` under `repos:`):
```yaml
  - repo: local
    hooks:
      - id: gitnexus-impact
        name: gitnexus blast-radius advisory (W332)
        entry: bash -c 'staged=$(git diff --staged --name-only); [ -z "$staged" ] && exit 0; warn=""; for f in $staged; do imp=$(gitnexus impact "$f" --json 2>/dev/null | jq -r ".count // 0"); [ "$imp" -gt 10 ] && warn="${warn}${f}: ${imp} symbols affected | "; done; [ -n "$warn" ] && echo "BLAST RADIUS WARN: $warn" >&2; exit 0'
        language: system
        stages: [pre-commit]
        always_run: true
        pass_filenames: false
```

**6.3 Smoke test**: stage a high-reference file (e.g., `CLAUDE.md`) → `git commit -m test` → expect stderr warning

**6.4 Reversal**: remove the `- repo: local` block + `pre-commit clean`

**6.5 Risk**: LOW (advisory exit 0; never blocks)

**6.6 Depends-on**: §3 gitnexus re-sync (impact analysis stale otherwise)

**6.7 Suggested commit msg**: `feat(W332): gitnexus-impact pre-commit advisory hook — code-graph blast-radius warn for staged files`

---

## §7 NEW: CLAUDE.md L7 correction (AUTO-APPLY)

**7.1 Pre-condition**: `grep -n "Stop-review-gate" CLAUDE.md` → finds L7

**7.2 Patch** (Edit CLAUDE.md L7):
Annotate the existing claim so future audits don't false-positive on the empty `settings.json:hooks.Stop`:
- old: `When codex@openai-codex plugin is installed, native hooks auto-wire SessionStart/SessionEnd/Stop-review-gate`
- new: `When codex@openai-codex plugin is installed, native hooks auto-wire SessionStart/SessionEnd/Stop-review-gate via .claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json (merges separately from settings.json; verify via plugin-hooks.json read, not settings.json:hooks.Stop scan)`

**7.3 Smoke test**: `grep "merges separately from settings.json" CLAUDE.md` → 1 match

**7.4 Reversal**: `git checkout HEAD -- CLAUDE.md`

**7.5 Risk**: LOW (doc-only)

**7.6 Suggested commit msg**: `docs(W332): annotate Stop-hook L7 as plugin-auto-wired to prevent settings.json-scan false-positives (closes W332 audit-trap)`

---

## §FINAL Execution-order DAG

```
[Independent / start-first]
  §3 gitnexus analyze (background, minutes) ─────────┐
                                                       ▼
[Auto-apply low-risk]                       §6 gitnexus-impact hook (requires §3)
  §7 CLAUDE.md correction
  §5.1 git-absorb adoption doc

[Auto-apply ASK-FIRST]
  §4 codex strict review-gate (workflow change)

[Operator-action]
  §1 SSH signing (interactive — passphrase choice)
  §2 Worktree prune
    ├─ W287/W290: cherry-pick → remove (1d idle, safe)
    ├─ W321/W330: confirm-no-active-session → remove
    └─ W328-nested: merge CR-9 pin → remove
  §5.3 Watchman + fsmonitor
  §5.4 jj eval-shim (cargo install)
```

## Carry-forward to W333+

- Lefthook vs pre-commit framework migration (per Stream 2 if recommended)
- Jujutsu adoption post-eval (if jj-shim eval positive)
- SLSA / Sigstore re-evaluation when CI is added (if ever)
- Embeddings generation for gitnexus semantic search

STATUS: COMPLETE (orchestrator-recovered direct execution)

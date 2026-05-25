# Phase 2 Bisect Matrix — Controlled Sandbox Repro — 2026-05-22

> Output of Phase 2 of `PLAN-2026-05-22.md`. Executes the codex-approved **two-way discriminator** from `phase0-hypothesis-ranking.md` (table row P0, "Falsifiable by" column) in an isolated throwaway git repo. Confirms-or-falsifies hypothesis **P0** (out-of-band tracked-file mutation during pre-commit's full-diff comparison window) against competing **P1/P2** (stash-internal byte-shift).
>
> **Bug surface under test**: pre-commit 4.6.0's "files were modified" gate is byte-equality of `git diff` stdout (`pre_commit/commands/run.py:206 @ f35134b`), NOT a content hash — sensitive to ANY tracked-file mutation during the hook window regardless of cause (Phase 0 Stream A §1, §5). The harness uses a deliberately SLOW (~1.5s) but provably read-only `local` hook to isolate the FRAMEWORK's before/after-diff mechanism — it is NOT exercising the `tools/precommit-msys-hooks-form.mjs` JS (already proven read-only in Phase 0 Stream C §3). The slow window guarantees a concurrent writer lands inside the comparison window.
>
> **Environment**: Windows 11 Pro · Git Bash (`C:\Program Files\Git\bin\bash.exe`) · pre-commit 4.6.0 · Node v22.22.0 · git 2.51.0.windows.2 · parent repo `core.autocrlf=input`.

## Reproduction command

Copy-paste-runnable. Builds an isolated scratch repo (gitignored from the parent under `tmp/`), installs a minimal slow read-only pre-commit gate, then runs control (no writer) + treatment (concurrent tracked-file writer). Re-runnable from the parent repo root (`Z:\claude-sota-installed`).

```bash
# --- 0. scratch repo (isolated; tmp/ is gitignored from parent) -----------
rm -rf tmp/msys-sandbox && mkdir -p tmp/msys-sandbox && cd tmp/msys-sandbox
git init -b sandbox
git config user.email s@b.x && git config user.name Sandbox
git config core.autocrlf input          # match parent repo default
echo "# sandbox" > README.md && git add README.md && git commit -m init --no-verify

# --- 1. minimal pre-commit config: ONE slow (~1.5s) read-only local hook ---
cat > .pre-commit-config.yaml <<'YAML'
repos:
  - repo: local
    hooks:
      - id: slow-readonly
        name: slow read-only hook (repro harness)
        entry: node -e "const s=Date.now();while(Date.now()-s<1500){};process.exit(0)"
        language: system
        always_run: true
        pass_filenames: false
        stages: [pre-commit]
YAML
git add .pre-commit-config.yaml && git commit -m "add precommit config" --no-verify
pre-commit install

# --- 2. CONTROL: 10 commits, NO concurrent writer (expect all PASS) -------
echo seed > ctrl.txt && git add ctrl.txt && git commit -m seed --no-verify
for i in $(seq 1 10); do
  echo "ctrl-$i $(date +%s%N)" >> ctrl.txt && git add ctrl.txt
  if git commit -m "control $i" >/dev/null 2>&1; then echo "control $i PASS"
  else echo "control $i FAIL"; git add ctrl.txt; git commit -m "ctl $i nv" --no-verify >/dev/null 2>&1; fi
done

# --- 3. TREATMENT: concurrent writer on TRACKED foo.txt; commit TRACKED bar.txt
echo fseed > foo.txt && git add foo.txt && git commit -m seedfoo --no-verify   # foo MUST be tracked first
echo bseed > bar.txt && git add bar.txt && git commit -m seedbar --no-verify
( for i in $(seq 1 200); do echo "w$i $(date +%s%N)" >> foo.txt; sleep 0.2; done ) &
WRITER=$!
for i in $(seq 1 5); do
  echo "bar-$i $(date +%s%N)" >> bar.txt && git add bar.txt
  out="$(git commit -m "treatment $i" 2>&1)"; rc=$?
  echo "$out" | grep -qi "files were modified by this hook" && fm=YES || fm=no
  [ $rc -eq 0 ] && echo "treatment $i PASS (files_modified=$fm)" || echo "treatment $i FAIL (files_modified=$fm)"
  [ $rc -ne 0 ] && { git add bar.txt; git commit -m "trt $i nv" --no-verify >/dev/null 2>&1; }
done
kill $WRITER 2>/dev/null; git checkout -- foo.txt 2>/dev/null   # stop writer + clean up
```

Bisect-matrix driver (repeats a 3-commit control + 3-commit treatment in a FRESH sub-repo per `core.autocrlf` value) is at `tmp/msys-sandbox/run-bisect.sh`. Control/treatment full-run scripts at `tmp/msys-sandbox/run-control.sh` and `tmp/msys-sandbox/run-treatment.sh`.

## Control experiment (10 commits, NO concurrent writer)

Each iteration mutates tracked `ctrl.txt`, then commits with the gate active. The slow (~1.5s) read-only hook runs but, with zero external writers, pre-commit's baseline diff (`run.py:294`) and post-hook diff (`run.py:203`) are byte-identical ⇒ `files_modified = (diff_before != diff_after) = False`.

| iter | exit | "files were modified"? | verdict |
|------|------|------------------------|---------|
| 1  | 0 | no | PASS |
| 2  | 0 | no | PASS |
| 3  | 0 | no | PASS |
| 4  | 0 | no | PASS |
| 5  | 0 | no | PASS |
| 6  | 0 | no | PASS |
| 7  | 0 | no | PASS |
| 8  | 0 | no | PASS |
| 9  | 0 | no | PASS |
| 10 | 0 | no | PASS |

**Control result: 10/10 PASS, 0/10 emitted "files were modified".** A single-session sandbox with zero external writers PASSES the gate consistently. This satisfies discriminator condition (1) from Phase 0: the single-session sandbox does NOT reproduce the failure ⇒ the "external writer" framing is NOT falsified.

## Treatment experiment (5 commits, WITH concurrent tracked-file writer)

A background process appends to TRACKED `foo.txt` every ~200ms (committed/tracked BEFORE the writer starts, so its mutations are tracked-file mutations that `git diff` sees). While it runs, 5 commits of a DIFFERENT tracked file (`bar.txt`) are attempted with the gate active. The 1.5s slow hook guarantees the writer mutates `foo.txt` inside pre-commit's comparison window ⇒ post-hook diff differs from baseline diff ⇒ false-positive "files were modified".

| iter | exit | "files were modified"? | verdict |
|------|------|------------------------|---------|
| 1 | 1 | **YES** | FAIL |
| 2 | 1 | **YES** | FAIL |
| 3 | 1 | **YES** | FAIL |
| 4 | 1 | **YES** | FAIL |
| 5 | 1 | **YES** | FAIL |

**Treatment result: 5/5 FAIL, 5/5 emitted "files were modified by this hook".** A controlled concurrent writer DETERMINISTICALLY reproduces the production failure. This satisfies discriminator condition (2) from Phase 0: a controlled concurrent-writer deterministically reproduces "files were modified" ⇒ **P0 CONFIRMED**.

### Verbatim failure signature (single treatment commit, captured for fidelity)

```
[WARNING] Unstaged files detected.
[INFO] Stashing unstaged files to Z:\claude-sota-installed\.cache\pre-commit\patch<epoch>-<pid>.
slow read-only hook (repro harness)......................................Failed
- hook id: slow-readonly
- files were modified by this hook
[WARNING] Stashed changes conflicted with hook auto-fixes... Rolling back fixes...
[INFO] Restored changes from Z:\claude-sota-installed\.cache\pre-commit\patch<epoch>-<pid>.
```

This is the EXACT production signature: the concurrent writer's unstaged mutation to `foo.txt` is what pre-commit stashes (`[WARNING] Unstaged files detected` → `Stashing`), the read-only hook is falsely reported `Failed` / `files were modified by this hook`, and the stash-restore then reports `Stashed changes conflicted ... Rolling back` → `Restored changes`. The hook performed ZERO writes — the byte-shift is entirely the external writer's mutation captured by `run.py:206`'s full-tree diff comparison.

## Bisect matrix (core.autocrlf × outcome)

Short version (3 control + 3 treatment commits) in a fresh sub-repo per autocrlf value, to confirm the repro is autocrlf-INVARIANT (corroborating Phase 0 Stream B's "CRLF is LOW likelihood for this repo" finding).

| core.autocrlf | control (no writer) | treatment (concurrent writer) |
|---------------|---------------------|-------------------------------|
| `input` | 3/3 PASS | 3/3 FAIL (files_modified=3/3) |
| `true`  | 3/3 PASS | 3/3 FAIL (files_modified=3/3) |
| `false` | 3/3 PASS | 3/3 FAIL (files_modified=3/3) |

**Matrix result: fully INVARIANT across all three autocrlf settings.** Control passes everywhere; treatment reproduces everywhere; the outcome has zero dependence on line-ending config. (Under `autocrlf=true` git emits harmless `LF will be replaced by CRLF` working-copy warnings, but these do NOT cause the gate to fail and do NOT change the control/treatment outcome.) This corroborates Phase 0's "not CRLF" finding and falsifies any CRLF-round-trip explanation (P1's autocrlf-retry sub-hypothesis and P2's `.gitattributes`-in-stash sub-hypothesis both predict autocrlf-SENSITIVITY, which is absent). The single Git version (2.51.0.windows.2) plus the invariance also leave P3 (version regression) unsupported — its predicted observable was a failure-rate that varies with config/version, and we observe none.

## Terminal verdict

**`ISOLATED-REPRO`** — the treatment (concurrent tracked-file writer) DETERMINISTICALLY reproduces "files were modified by this hook" (5/5 + 3/3/3 in matrix) WHILE the control (no writer) PASSES consistently (10/10 + 3/3/3 in matrix). Per the Phase 0 discriminator, this is **P0 CONFIRMED**:

- The failure REQUIRES an out-of-band tracked-file writer mutating the worktree during pre-commit's full-diff comparison window. Without a writer (control), the gate never fires. With a controlled writer (treatment), it fires every time.
- **P1/P2 are NOT the operative mechanism**: both predicted the gate would fail (or the diff-delta would shift) in the single-session / stash-internal path with NO external writer. The control NEVER failed across 16 total commits (10 + 3×2 matrix controls), so the stash-restore mechanism alone does NOT shift the diff bytes here. (P1/P2 are not categorically disproven as theoretical edge cases, but they are not what produces THIS repro — the external writer is necessary and sufficient.)
- **P3 (Git-version regression) unsupported**: outcome is autocrlf-invariant on a single Git version; no version-correlated failure-rate signal.
- The leading concrete P0 mechanism — a concurrent CC session sharing the worktree (Phase 0 SHIP INCIDENT `7f3b733`, and the in-flight W362c commit stream) — is exactly modeled by the treatment's background tracked-file writer. The sandbox proves the *mechanism class*; the Phase 0 ship incident + W362c circumstantial evidence attribute the *specific writer* to concurrent CC sessions.

## Case A/B/C branch decision

**Case B (runtime-state fix).** P0 is confirmed: the root cause lives in the operator/runtime layer (concurrent session worktree-sharing writing tracked files inside another session's hook window), NOT in pre-commit framework code (Case A would be a framework/config fix) and NOT in the hook JS (proven read-only). The control's clean 10/10 PASS rules out the Case-A fallback (single-session `.gitattributes`/`autocrlf` adjustment per P1/P2), since single-session mode never reproduces.

Surgical fix options carried from Phase 0 §"Carry to Phase 3 fix design" (now validated by this repro):

- **B-1 (operator discipline)** — enforce per-session worktree isolation via the existing `tools/eee.ps1 --Wave Wn --Slug s` launcher (W363). One worktree per concurrent session ⇒ no shared-worktree tracked-file writes ⇒ no cross-session hook-window collision. The sandbox confirms isolation is the structural fix: the treatment failure is impossible if no second writer touches the same worktree.
- **B-2 (in-hook detection)** — add a `staged_files_only`-style guard in `tools/precommit-msys-hooks-form.mjs` that parses `git status --porcelain` for concurrent-session unstaged-tracked-mods and fast-fails with the exact mitigation (`git stash --keep-index`) printed inline. Composes with the W363 wave-lock guard.
- **B-3 (pre-commit upstream)** — deferred: file a `pre-commit/pre-commit` issue documenting the concurrent-session pathology of the `staged_files_only.py` patch-stash + full-tree byte-diff detection. Non-blocking.

## Cite-anchor footnote (per CR-6 + citations-agent discipline)

- pre-commit/pre-commit `@f35134b05028ec938ac605ae500fdf95462655d3` v4.6.0 (MIT) — detection byte-equality `commands/run.py:206`; baseline diff `:294`; post-hook diff `:203`; emission `:227-228`; patch-stash `staged_files_only.py:50-104`, `:80-82` (`git checkout -- .`), `:85-96` (autocrlf=false retry).
- This experiment (independently reproducible): `tmp/msys-sandbox/.pre-commit-config.yaml` (slow read-only `local` hook) + `tmp/msys-sandbox/run-control.sh` (10/10 PASS) + `tmp/msys-sandbox/run-treatment.sh` (5/5 FAIL + verbatim signature) + `tmp/msys-sandbox/run-bisect.sh` (autocrlf input/true/false × 3/3 PASS control, 3/3 FAIL treatment).
- Phase 0: `docs/architecture/msys-rootcause/phase0-hypothesis-ranking.md` (two-way discriminator, ranked hypothesis table, SHIP INCIDENT `7f3b733` → recovery `b29b10a`).
- Phase 1: `tools/precommit-msys-diag.mjs` (read-only P0-LIKELY / P1-P2-LIKELY / NO-REPRO discriminator).
- Environment: pre-commit 4.6.0 · Node v22.22.0 · git 2.51.0.windows.2 · `core.autocrlf=input` (parent) — all version-probed live this wave.
- 3-org-distinct: pre-commit (open-source MIT) · Git for Windows (Microsoft-supported) · Node.js/libuv (OpenJS Foundation).

---

### Methodology note — why this isolates the framework, not the hook

The harness intentionally substitutes a trivial slow read-only `local` hook for `tools/precommit-msys-hooks-form.mjs`. This is deliberate: Phase 0 Stream C §3 already proved the production hook makes only read-only fs calls (4 reads, zero write APIs). The actual bug surface is pre-commit's framework-level before/after byte-diff comparison (`run.py:206`), which is hook-agnostic — it trips on ANY tracked-file mutation during ANY hook's runtime. By using a known-read-only hook with a controlled ~1.5s window, the experiment proves the mechanism is the FRAMEWORK's diff comparison reacting to an EXTERNAL writer, with the hook's own behavior held constant and provably innocent. A real-world hook merely needs to run long enough for a concurrent writer to land inside its window; the production msys-hooks-form hook's own runtime provides that window.

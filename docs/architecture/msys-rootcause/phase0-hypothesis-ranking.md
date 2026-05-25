# Phase 0 Hypothesis Ranking — 2026-05-22

> Output of Task 1 of `PLAN-2026-05-22.md`. 3 parallel research streams converged on a single dominant hypothesis. Per W269 parallel-dispatch mandate, all 3 streams launched in one assistant message.

## Streams (3-org-distinct)

- **Stream A** — pre-commit framework hash-comparison source archaeology (`pre-commit/pre-commit @ f35134b05028ec938ac605ae500fdf95462655d3` v4.6.0, MIT)
- **Stream B** — Git-for-Windows `--keep-index` × `core.autocrlf` semantics (`git-scm.com/docs/git-stash` + Git for Windows 2.51.0.windows.2)
- **Stream C** — libuv/Node Windows FS layer + cache tree walk (`libuv/libuv @ v1.x src/win/fs.c`, MIT)

## Critical convergence findings

1. **Pre-commit does NOT hash** — detection at `pre_commit/commands/run.py:206 @ f35134b` is byte-equality of `git diff` stdout. Compares baseline (taken after `staged_files_only` custom stash) vs post-hook diff. NO `files:` regex filter — diff covers ENTIRE working-tree-vs-index for ALL tracked files. *(Stream A §1, §2, §5)*

2. **Custom patch-based stash, NOT `git stash`** — `staged_files_only.py:50-104 @ f35134b` saves `git diff-index --binary` to `{store.dir}/patch{epoch}-{pid}`, calls `git checkout -- .` to clear, runs hook, then `git apply --whitespace=nowarn` with `core.autocrlf=false` retry on failure. *(Stream A §6)*

3. **Hook is provably read-only confirmed** — `tools/precommit-msys-hooks-form.mjs` makes 4 read-only fs calls (L94 `readdirSync` · L98 `statSync` · L108 `readFileSync` · L148 `existsSync`); zero write APIs imported (`writeFileSync`/`utimes`/`open(...,'w')`/`rename`/`unlink` all absent). *(Stream C §3)*

4. **This repo's CRLF config is hash-stable** — `core.autocrlf=input` (local overrides system `=true`) + `.gitattributes` `* text=auto eol=lf` + hook file currently `i/lf w/lf` aligned per `git ls-files --eol`. Stream B verdict: CRLF round-trip flip is LOW likelihood. *(Stream B §5, §6)*

5. **NTFS atime + mtime can't drift from pure reads** — Vista+ default disables atime updates (`fsutil behavior query disablelastaccess`=1); mtime requires write-handle open. 171,140 cache entries with only 1 reparse-point (`context-mode/1.0.141 → 1.0.146` junction) — symlink chains are not a factor. *(Stream C §1, §4, §5)*

## Ranked hypothesis table

| Rank | Hypothesis | Stream evidence | Predicted observable (Phase 1 diag) | Falsifiable by (Phase 2 sandbox) |
|------|------------|-----------------|-------------------------------------|----------------------------------|
| **P0** | **Out-of-band mutation of a tracked file during pre-commit's full-diff comparison window (between baseline `run.py:294` and post-hook `run.py:203`), shifting `git diff` bytes.** Leading concrete mechanism: a concurrent CC session writing to the shared worktree. Other in-class candidates NOT yet excluded: IDE/editor autosave, file watchers (gitnexus / context-mode indexers), git post-checkout filters firing on the stash-clear `git checkout -- .` | A §1+§5 (byte-equality of FULL working-tree diff for ALL tracked files) + C §3 (hook itself read-only ⇒ any mutation is external to the hook) + **SHIP INCIDENT 2026-05-22**: commit `7f3b733` swapped staged spec for concurrent W362c session's `tools/eee.ps1` + `tools/test/eee-wave-launcher.test.ps1` — strong *circumstantial* evidence for the concurrent-session mechanism specifically | Phase 1 diagnostic captures the SPECIFIC tracked file whose content/mode changed during the hook window, AND attributes the writer to a class (CC-session / watcher / checkout-filter) via mtime + process correlation | **Clean discriminator (two-way):** (1) if Phase 1 proves NO tracked-file content/mode change occurs between baseline & post-hook diff yet the gate STILL fires → P0 FALSIFIED, the byte-shift is internal to the stash mechanism (→ P1/P2); (2) if a single-session sandbox (zero external writers) reproduces an IDENTICAL diff-delta → the "external writer" framing is FALSIFIED (→ P1/P2) |
| P1 | Stash-restore retry path (the `core.autocrlf=false` retry on `git apply` failure at `staged_files_only.py:85-96`) leaves the working tree mode/index-sha asymmetric vs the pre-stash baseline | A §6 (`git apply --whitespace=nowarn` with autocrlf=false retry) + B §3 (autocrlf semantics) | `git diff` mode/index-sha differs pre-vs-post even on a single-session repo; `git apply` exits non-zero in stash-restore | Phase 2 sandbox + force-stash-retry instrumentation: if mode/sha is byte-identical pre-vs-post across the forced-retry path → P1 falsified |
| P2 | `.gitattributes` itself is in the stashed-unstaged set, so during the hook run the worktree's `.gitattributes` differs from index, changing how subsequent files render in `git diff` | A §3 (baseline taken AFTER stash + checkout) + B §4 (`.gitattributes` precedence) | `.gitattributes` shows in `git status` at hook-runtime in 2+ Phase 1 diag runs | Phase 2: stage-pin `.gitattributes` (never in the stashed set) and re-run — if failure persists → P2 falsified |
| P3 | Git-for-Windows 2.51 stash/diff regression specific to NTFS | B §2 (negative evidence — no indexed issue, but JS-rendered search unconfirmed) | failure-rate correlation with `git --version` across the sandbox matrix | Git version matrix (2.40 / 2.45 / 2.51) in Phase 2 sandbox: if failure rate is INVARIANT across versions → P3 falsified (the issue is version-agnostic) |
| ~~P4~~ | ~~NTFS atime/mtime drift from pure-read fs walks~~ | **RULED OUT** by C §1, §4, §5 (definitive — pure reads cannot mutate mtime on NTFS; pre-commit compares `git diff` bytes not mtimes) | n/a | n/a |

## Verdict

**P0 — out-of-band tracked-file mutation during pre-commit's full-diff comparison window — is the dominant hypothesis CLASS**, with concurrent-CC-shared-worktree-writer as the leading concrete mechanism (NOT the only one — IDE autosave, file watchers, and checkout-filters remain in-class until Phase 1 instrumentation discriminates). Based on convergence of:

- **Stream A's empirical proof** that pre-commit's detection is byte-equality of full working-tree diff — sensitive to ANY tracked-file mutation during the hook window, regardless of which process caused it.
- **Stream C's confirmation** the hook itself is read-only — eliminating self-mutation, so the mutating writer is necessarily *external* to the hook.
- **Stream B's elimination** of CRLF as a likely cause for THIS repo's config (`autocrlf=input` + `eol=lf` attribute + currently-aligned `i/lf w/lf`).
- **Circumstantial reproduction**: the 2026-05-22 SHIP INCIDENT — `7f3b733` (wrong content, recovered) → `git reset --soft HEAD~1` + clean restage + `git stash --keep-index` isolation → `b29b10a` (clean spec commit) — is consistent with the concurrent-session mechanism but does NOT alone prove it over the other in-class writers. Phase 1 instrumentation is required to attribute the specific writer.

The pattern is reinforced by ongoing W362c activity: during this Phase 0 wave alone, W362c shipped commits `0c7f989 → 70d6e96 → d4895c4 → 0fa7711 → 10f8f2f → 78c4bc7 → efb7f29` (7 commits) and grew its unstaged-tracked-mods set from 6 → 8 files mid-wave, while my SPEC+PLAN waves were in flight — every one of those writes is a candidate P0 trigger if it lands inside another session's hook window.

**Phase 1's job is to convert P0 from a hypothesis-class into an attributed root cause** by capturing (a) the exact tracked file mutated, (b) its content-vs-mode delta, and (c) the writer's process/timestamp signature — and to run the two-way discriminator that can falsify P0 in favor of P1/P2.

## Carry to Phase 3 fix design

P0-confirmation drives **Case B (runtime-state fix)** — the root cause is in the operator/runtime layer (concurrent session worktree-sharing), NOT in pre-commit framework code or hook config. Surgical fix options:

- **B-1 (operator discipline)**: enforce per-session worktree isolation via existing `tools/eee.ps1 --Wave Wn --Slug s` (W363 launcher). Already implemented; needs documentation reinforcement + CR-6 verify-before-claim signal at session start.
- **B-2 (in-hook detection)**: add a `staged_files_only`-style lock in `tools/precommit-msys-hooks-form.mjs` to detect concurrent-session unstaged-tracked-mods (via `git status --porcelain` parse) and fast-fail with the exact mitigation command (`git stash --keep-index`) printed inline. Composes with W363 wave-lock guard.
- **B-3 (pre-commit upstream)**: deferred — file `pre-commit/pre-commit` issue documenting concurrent-session pathology with `staged_files_only.py` patch-stash mechanism. Not blocking the wave; documented in audit doc.

(P1/P2 fallback: if Phase 2 sandbox unexpectedly REPRODUCES the failure in single-session mode, Case A fix becomes appropriate — surgical `.gitattributes`/`autocrlf` adjustment per P1 or P2 verdict.)

## Cite-anchor footnote (per CR-6 + citations-agent discipline)

- pre-commit/pre-commit `@f35134b05028ec938ac605ae500fdf95462655d3` v4.6.0 (MIT) — `commands/run.py:203`, `:206`, `:227-228`, `:294`, `:274-279` + `staged_files_only.py:23`, `:26-32`, `:35-47`, `:50-104`, `:80-82`, `:85-96`
- git-scm.com/docs/git-stash §OPTIONS + §COMMANDS + gitattributes §End-of-line + §text
- libuv/libuv `@v1.x src/win/fs.c` — `fs__stat_impl_from_path`
- nodejs.org/api/fs.html — `fs.Stats` Windows section
- This repo: `tools/precommit-msys-hooks-form.mjs:56,94,98,108,148` + `.gitattributes:1-4` + `.git/config:[core] autocrlf=input` + live `git ls-files --eol` output
- SHIP INCIDENT 2026-05-22: bad commit `7f3b733` (no longer in history per `git reset --soft HEAD~1`) → recovery commit `b29b10a docs(spec): msys-hooks-form root-cause + diagnostic + sandbox design`
- 3-org-distinct: pre-commit (open-source MIT) · Git for Windows (Microsoft-supported) · libuv/Node.js (OpenJS Foundation)

---

## Appendix: Raw stream outputs (verbatim, for §-ref resolution)

The §-references in the hypothesis table resolve against these verbatim stream agent outputs.

### Stream A — pre-commit framework hash mechanism (`pre-commit/pre-commit @ f35134b`, v4.6.0)

> **§1 Hash algorithm**: None. Zero `hashlib`/`sha1`/`sha256` references in `pre_commit/*.py` or `pre_commit/commands/*.py`. Detection uses raw `bytes != bytes` equality of `git diff` stdout (`pre_commit/commands/run.py:206 @ f35134b`).
>
> **§2 File-set scope**: `git diff --no-ext-diff --no-textconv --ignore-submodules` (no path filter) — entire working-tree-vs-index diff for ALL tracked files, NOT scoped to hook's `files:` regex (`run.py:274-279 @ f35134b`). Any unrelated working-tree drift during the hook run trips the gate.
>
> **§3 WHEN baseline taken**: `prior_diff = _get_diff()` at `run.py:294 @ f35134b` — AFTER `staged_files_only()` context entered (line 421), i.e. AFTER unstaged changes stashed via patch + `git checkout -- .` (`staged_files_only.py:80-82 @ f35134b`). Baseline = diff of (staged-only working tree) vs (index).
>
> **§4 WHEN comparison taken**: `diff_after = _get_diff()` at `run.py:203 @ f35134b`, IMMEDIATELY after `language.run_hook(...)` returns, BEFORE stash pop. Then `prior_diff` reassigned to `diff_after` (`run.py:296`) so each hook compares against the previous hook's post-state.
>
> **§5 Decision rule**: `run.py:206 @ f35134b` → `files_modified = diff_before != diff_after`. Emission at `run.py:227-228` → `if files_modified: _subtle_line('- files were modified by this hook', use_color)`.
>
> **§6 Stash mechanism**: NOT `git stash`. Custom patch-based stash (`staged_files_only.py:50-104 @ f35134b`): Save → `git diff-index --ignore-submodules --binary --exit-code --no-color --no-ext-diff <write-tree> --` to `{store.dir}/patch{epoch}-{pid}` (lines 52-75). Clear → `git -c submodule.recurse=0 checkout -- .` with env `_PRE_COMMIT_SKIP_POST_CHECKOUT=1` (lines 23, 81). Restore → `git apply --whitespace=nowarn <patchfile>` with `core.autocrlf=false` retry on failure (lines 26-32, 85-96). Intent-to-add files cleared via `git rm --cached --` / restored via `git add --intent-to-add --` (lines 35-47).

### Stream B — Git-for-Windows `--keep-index` × CRLF (Git 2.51.0.windows.2)

> **§1 `--keep-index` semantics** (`git-scm.com/docs/git-stash`): stashes all local modifications, rolls worktree back to HEAD, then re-applies the index. Re-checkout (`git checkout-index`) is where EOL filters fire.
>
> **§2 CRLF stash bug history**: GitHub issue-search for `stash autocrlf`/`stash CRLF` on `git-for-windows/git` returns JS-rendered UI only — no direct issue titles in indexed HTML. No specific stash×CRLF bugfix in 2.40–2.51 changelog scan. (Negative evidence; deeper issue-tracker probe queued.)
>
> **§3 autocrlf round-trip** (`git-scm.com/docs/gitattributes`): `=true` → checkout LF→CRLF, stash→pop re-runs filter (flip risk). `=input` → checkin LF-normalizes, checkout does NOT convert (no flip). `=false` → no conversion.
>
> **§4 `.gitattributes` precedence**: explicit `text eol=lf` OVERRIDES `core.autocrlf` — no CRLF injection regardless of autocrlf.
>
> **§5 THIS repo's effective state**: `core.autocrlf=input` (`.git/config`, overrides system `=true`); `core.eol` unset; `core.safecrlf` unset; `.gitattributes` present (tracked); `*.mjs` falls through to `* text=auto eol=lf` (line 4); `check-attr` on hook file → `text:auto eol:lf`; `git ls-files --eol` → `i/lf w/lf` (aligned); Git `2.51.0.windows.2`.
>
> **§6 Ranked hypotheses**: (1) LOW — CRLF flip via stash (eol=lf + autocrlf=input + w/lf ⇒ hash-stable); (2) MEDIUM — attribute-application ordering during `checkout-index` if `.gitattributes` itself is stashed; (3) LOW — GfW 2.51 stash regression (no positive evidence). Stronger candidates likely OUTSIDE stash×CRLF.

### Stream C — libuv/Node Windows FS side-effects (`libuv@v1.x src/win/fs.c`)

> **§1 statSync atime**: Node `fs.statSync` does NOT update atime on Windows. NTFS atime updates disabled by default since Vista (`disablelastaccess`=1). libuv `fs__stat_impl_from_path` opens with `FILE_READ_ATTRIBUTES | FILE_FLAG_OPEN_REPARSE_POINT | FILE_FLAG_BACKUP_SEMANTICS` — read-only metadata.
>
> **§2 readdirSync recursion**: returns NAMES only, no child-stat, no symlink-traverse. Symlink follow only on subsequent `statSync` (not `lstatSync`).
>
> **§3 hook fs.* surface** (`tools/precommit-msys-hooks-form.mjs`): L94 `readdirSync` (RO) · L98 `statSync` (RO metadata) · L108 `readFileSync` (RO) · L148 `existsSync` (RO). Imports L56: zero write APIs. **"provably read-only" CONFIRMED.**
>
> **§4 Cache tree**: TotalEntries 171,140; ReparsePointCount 1 (`.claude\plugins\cache\context-mode\context-mode\1.0.141 → 1.0.146` junction).
>
> **§5 mtime drift**: pure-read fs walk CANNOT mutate mtime on NTFS (requires write-handle). Pre-commit compares git-tracked hashes, not mtimes. Untracked gitignored cache is out of scope.
>
> **§6 Ranked FS hypotheses**: (1) NOT an FS side-effect — pre-commit detection is git-diff, not mtime; (2) CRLF/LF normalization by git itself; (3) concurrent writer mutating a TRACKED file during hook runtime.

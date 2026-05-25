# W317 STREAM-E — 4 upstream PR drafts (W325 Stream-D D-H3)

**Status**: PASTE-READY paste-templates for operator. Operator GH-account required (`gh auth status` must show authenticated session with `repo` scope on each target repo before `gh pr create` will succeed).

**Last-updated**: 2026-05-19 (W325 ship).

**Source carry-over**: W317 STREAM-E (closure-wave); per W325 audit citation "W317 STREAM-E 4 upstream PRs (operator GH-account)". Concrete PR targets are recovered from W317-OPS-CLOSURE-WAVE Stream-E AI ledger where available; placeholders are provided where the W317 source notes did not surface a specific upstream target — operator to fill in from W317-r2 forward-AI queue.

**Cardinal-rule compliance**: PRs are NOT auto-fired. `gh pr create` is operator-confirmation only. See Cardinal R5 + "Actions visible to others" governance.

---

## PR-1: anthropics/claude-code — `claude doctor` per-check timeout + verbose

**Status**: PLACEHOLDER pending operator pairing with `UPSTREAM-ISSUES.md` (W325 Stream-D D-H1).

**Target repo**: `anthropics/claude-code`

**Target branch**: `main`

**PR type**: Feature / bug-fix (paired with the upstream issue filed in `docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md`)

**Title**: `feat(doctor): add per-check timeout and --verbose flag to surface hanging checks`

**Body (paste-ready)**:

```markdown
## Summary

Add a per-check timeout (default 5s) and a `--verbose` flag to `claude doctor` so operators can identify which individual diagnostic check is hanging on portable / state-redirected installs.

## Motivation

Closes #<UPSTREAM-ISSUE-NUMBER> (issue filed via `docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md`).

Per the linked issue: `claude doctor` hangs ~30s and exits 124 silent on Z:-portable + state-redirected runtimes (Windows 11, 7+ wave-convergent). Without per-check telemetry, operators cannot identify which check is hanging.

## Changes

- `src/commands/doctor.ts` (or equivalent): wrap each individual diagnostic check in a `Promise.race([check, timeout(5000)])`.
- Add `--verbose` CLI flag that emits one line per check as it starts + completes.
- Add `--check <name>` to run a single named check (allows manual bisection by operators).

## Test plan

- `claude doctor --verbose` emits one line per check.
- `claude doctor --check settings` runs only the settings-validity check.
- Each check times out individually at 5s; cumulative wall-clock bounded at `N_checks * 5s` regardless of hang behavior.
- Regression: bare `claude doctor` on a healthy install still completes in <2s and exits 0.

## References

- Linked issue: anthropics/claude-code#<TODO-issue-number>
- Local workaround documented at: `docs/architecture/W325-WAVE/CLAUDE-DOCTOR-HANG-WORKAROUND.md`
- CLI reference: https://code.claude.com/docs/en/cli-reference
```

**Operator paste-ready CLI**:

```bash
# Pre-requisite: fork anthropics/claude-code, branch off main, make code change, push
gh pr create \
  --repo anthropics/claude-code \
  --base main \
  --head <your-fork>:feat-doctor-per-check-timeout \
  --title "feat(doctor): add per-check timeout and --verbose flag to surface hanging checks" \
  --body-file docs/architecture/W325-WAVE/W317-STREAM-E-PR-DRAFTS.md
# (Manually trim body to only PR-1 section before posting, or copy/paste body inline.)
```

---

## PR-2: anthropics/claude-code — PROJECT_DIR state-redirect honor

**Status**: PLACEHOLDER. Per W315-r2 + W319 Stream-A finding: `CLAUDE_CODE_PROJECT_DIR` env var is documented but session JSONL writes still land at default `~/.claude/projects/` path (operator-reported "0 JSONL at state-redirect path vs 3041 at in-tree path in CC 2.1.144" — W315 F-SS-1 + W319-D STALE-D-7).

**Target repo**: `anthropics/claude-code`

**Target branch**: `main`

**PR type**: Bug-fix

**Title**: `fix(state): honor CLAUDE_CODE_PROJECT_DIR for session JSONL writes`

**Body (paste-ready)**:

```markdown
## Summary

Honor the `CLAUDE_CODE_PROJECT_DIR` env var when writing session JSONL files. Currently session JSONL writes default to `<USERPROFILE>/.claude/projects/<session-id>/` regardless of the env override.

## Motivation

`CLAUDE_CODE_PROJECT_DIR` is documented at https://docs.anthropic.com/en/docs/claude-code/settings as a supported env var for redirecting session state outside the user's home directory (state-outside-repo governance pattern). However, in CC 2.1.144 the variable is read but not consulted at the JSONL write site.

Observed behavior:
- Setting `CLAUDE_CODE_PROJECT_DIR=Z:/state/.claude/projects` produces 0 JSONL files at the redirected path.
- Same session produces ~3000 JSONL entries at the default `~/.claude/projects/<session-id>/` path.

This breaks the state-outside-repo discipline for Z:-portable installs and prevents proper session-state isolation.

## Changes

- `src/session/jsonl-writer.ts` (or equivalent): replace hardcoded `path.join(os.homedir(), '.claude/projects')` with `process.env.CLAUDE_CODE_PROJECT_DIR || path.join(os.homedir(), '.claude/projects')`.
- Add directory existence check + auto-create on first write.

## Test plan

- With `CLAUDE_CODE_PROJECT_DIR=/tmp/test-projects`, session JSONL files land at `/tmp/test-projects/<session-id>/`.
- Without the env var, default behavior is preserved.
- On Windows, drive-letter paths (e.g. `Z:/state/.claude/projects`) are honored.

## References

- W315-r2 + W319-D local audit findings.
- Settings doc: https://docs.anthropic.com/en/docs/claude-code/settings
```

**Operator paste-ready CLI**:

```bash
gh pr create \
  --repo anthropics/claude-code \
  --base main \
  --head <your-fork>:fix-project-dir-honor \
  --title "fix(state): honor CLAUDE_CODE_PROJECT_DIR for session JSONL writes" \
  --body-file <path-to-trimmed-body.md>
```

---

## PR-3: PLACEHOLDER — W317 STREAM-E target #3

**Status**: PLACEHOLDER. Operator to fill in from W317-OPS-CLOSURE-WAVE Stream-E source notes (specific repo/title not surfaced in current published docs).

**Target repo**: `<TODO — operator to fill from W317 STREAM-E source>`

**Target branch**: `<TODO>`

**PR type**: `<TODO>`

**Title**: `<TODO>`

**Body skeleton**:

```markdown
## Summary

<TODO: one-line summary of the change>

## Motivation

<TODO: link to W317 STREAM-E source AI ID + reasoning>

## Changes

<TODO: list of files / functions modified>

## Test plan

<TODO: how the change is verified>

## References

<TODO: cite-anchored URLs from upstream docs>
```

**Operator next-action**:

1. Open `docs/architecture/W317-OPS-CLOSURE-WAVE/W317-R2-SYNTHESIS.md` (~140KB) and identify the 3rd STREAM-E upstream-PR target by AI ID.
2. Fill in `<TODO>` slots above.
3. Push fork branch, then `gh pr create` as above.

---

## PR-4: PLACEHOLDER — W317 STREAM-E target #4

**Status**: PLACEHOLDER. Operator to fill in from W317-OPS-CLOSURE-WAVE Stream-E source notes (specific repo/title not surfaced in current published docs).

**Target repo**: `<TODO — operator to fill from W317 STREAM-E source>`

**Target branch**: `<TODO>`

**PR type**: `<TODO>`

**Title**: `<TODO>`

**Body skeleton**:

```markdown
## Summary

<TODO: one-line summary of the change>

## Motivation

<TODO: link to W317 STREAM-E source AI ID + reasoning>

## Changes

<TODO: list of files / functions modified>

## Test plan

<TODO: how the change is verified>

## References

<TODO: cite-anchored URLs from upstream docs>
```

**Operator next-action** (same pattern as PR-3): grep W317 STREAM-E synthesis for 4th upstream-PR target, fill slots, push, `gh pr create`.

---

## All-PR operator checklist

Before invoking any `gh pr create`:

1. **Verify auth**: `gh auth status` shows `Logged in to github.com as <user> (<token-source>)` with `repo` scope.
2. **Verify fork**: each PR requires a fork of the upstream repo on the operator's GH account.
3. **Verify branch**: branch off the upstream default branch (`main` for anthropics/claude-code), make changes, commit, push to fork.
4. **Verify body**: trim this combined doc to the relevant single-PR body before passing via `--body-file`, OR pass `--body` inline with the relevant section.
5. **Verify cite-anchor**: each PR body cites at least one https://docs.anthropic.com/* or https://code.claude.com/* URL for the operator-facing claim being addressed.
6. **Cardinal R5**: `gh pr create` is operator-action-visible-to-others; never auto-fire.

---

## Cross-references

- W325 Stream-D D-H3 source: this doc.
- W317 STREAM-E source notes: `docs/architecture/W317-OPS-CLOSURE-WAVE/W317-R2-SYNTHESIS.md` (operator-side reading).
- W325 Stream-D D-H1 paired: `docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md` + `CLAUDE-DOCTOR-HANG-WORKAROUND.md`.
- W325 Stream-D D-H2 paired: archived `tools/migrate-cognee-state.ps1` at `.claude/skills/_archived/W325-deprecated/`.

---

## Why 2 placeholders + 2 concrete?

Per W325 P8 mandate: "If W317 STREAM-E details aren't surfaced in current docs, write a structural placeholder noting 'operator to fill in specific PR targets from W317 STREAM-E source notes; this doc structures the 4 placeholders'."

PR-1 (`claude doctor` per-check timeout) is the natural pairing for the D-H1 issue this same wave files, so it is filled concretely.

PR-2 (`CLAUDE_CODE_PROJECT_DIR` honor) is concretely surfaced as a recurring upstream-impacting finding across W315-r2 F-SS-1 + W319-D STALE-D-7 + W324 audit, so it is filled concretely.

PR-3 + PR-4 remain structural placeholders pending operator-side recovery from the W317 STREAM-E source notes.

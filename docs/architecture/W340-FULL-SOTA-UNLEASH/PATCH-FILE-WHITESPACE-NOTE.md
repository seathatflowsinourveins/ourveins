# Patch-file whitespace warning — intentional / preserved

> **Wave**: W340-FULL-SOTA-UNLEASH wave-close
> **Date**: 2026-05-20
> **Status**: documented as inherent; NOT a defect.

## Observation

`git diff --cached --check` reports `space before tab in indent` warnings on these staged files:

- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/patch-1-add-529-case.diff`
- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/patch-2-full-jitter.diff`
- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/selector-integration.diff`

## Why these are preserved (not cleaned)

Unified diff files (`.diff`) are byte-exact recordings of patches against an external upstream repo (`router-for-me/CLIProxyAPI`). The original Go source code mixed spaces + tabs in some indented continuation lines; the diff is required to reflect that EXACTLY to remain applicable via `git apply` / `patch`.

Cleaning the whitespace in the `.diff` files would:
1. Break `git apply` / `patch` rejecting the hunks with whitespace-mismatch errors
2. Corrupt the recorded provenance of the upstream codebase
3. Defeat the purpose of the late-attribution artifact dir

## Why this is not a CR-2 or CR-6 violation

- CR-2 governs project-owned hook bodies in `.claude/hooks/**` (this is in `docs/architecture/`)
- CR-6 verify-before-claim — the patch files ARE the verifiable evidence; whitespace mutation would itself be unverify-able
- Codex r1 explicitly flagged this in its first verdict: "Some warnings are patch-file whitespace, but there is also trailing whitespace in staged markdown files." Markdown trailing whitespace is FIXED; patch-file whitespace is RETAINED-BY-DESIGN.

## Verification command

To restrict `git diff --cached --check` to NON-patch-file content (excluding inherent warnings):

```bash
git diff --cached --check -- . ":!docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/*.diff"
```

This returns exit-0 + no warnings on the W340 staged set.

## Cite anchors

- `https://git-scm.com/docs/git-diff` — `--check` flag documentation
- `https://git-scm.com/docs/git-apply` — whitespace-handling discipline
- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/README.md` — upstream attribution
- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/VERDICT-LEDGER.md` — patch provenance

# W328-C-2 — real-history replay test cases

**Wave**: W328 Stream C
**Date**: 2026-05-19
**Hook under test**: `tmp/w328-c/hook-v2-prototype.sh` (prose-form prototype; equivalent of the single-line YAML invocation in `.pre-commit-config.yaml` after W328-C-3 apply).

---

## Methodology

For each test case:
1. Extract commit message body via `git log --format=%B -n 1 <sha> > tmp/w328-c/msg-<sha>.txt`.
2. Extract staged file list via `git show --name-only --pretty=format: <sha> > tmp/w328-c/files-<sha>.txt`.
3. Invoke prototype `bash hook-v2-prototype.sh msg-<sha>.txt files-<sha>.txt`.
4. Compare exit code against expected.

All four real-history SHAs verified present in current working-tree git history at HEAD `2c48b1e`:
- `5cac3ec` = `ship(W320): W319-forward-queue execution wave — 4-stream parallel sweep`
- `670423d` = `ship(W326): 4-stream gap-resolution + /plugin update post-state + GPT-5.5 deep audit (round 13)`
- `d6087ec` = `ship(W327): REMEDIATION 4-stream + provenance-lint applied + codex round-14`
- `6ee7ea4` = `ship(W327-codex-r1): scope narrow + Stream A sca-v11 + ops-rhythm late-completion`

---

## TC1 — W320 historical race (5cac3ec)

**Expected**: BLOCK (exit 2)

**Trigger line** (commit body line 37): `  - D1 M6 PreCompact silent-fallback APPLIED settings.json:154 (15964 to 16025B).`

**Why it should BLOCK**: claim is `APPLIED settings.json:154` (F3 no-colon form). After v2 path-normalization strips `:154` and any trailing punctuation, the candidate path is `settings.json`. The W320 staged file set (21 files, see `tmp/w328-c/files-5cac3ec.txt`) contains ZERO `settings.json` entries (this is the W320 race documented in CLAUDE.md L_archive: settings.json change landed in a parallel commit, not this one). Both exact-match and endsWith-fallback FAIL → BLOCK.

**Result**: ✅ PASS — hook exits 2 with violation `APPLIED (no-colon) claim path 'settings.json:154' not in staged set`.

## TC2 — W326 historical race (670423d)

**Expected**: BLOCK (exit 2)

**Trigger line** (commit body line 20): `  - APPLIED: SKILL.md §7 install denom math fix 33.7 -> 34.7 (root cause:`

**Why it should BLOCK**: claim is `APPLIED: SKILL.md` (F1 colon-prefix form). The W326 staged set (19 files, see `tmp/w328-c/files-670423d.txt`) contains ZERO files named `SKILL.md` — only `.claude/settings.json` and various `docs/architecture/W326-*/...` markdown. Both exact-match and endsWith-fallback FAIL (no staged path ends with `/SKILL.md`) → BLOCK.

**Also verified non-blocking**: line 10 `APPLIED: settings.json:206` — claim path after `:206` strip = `settings.json`. Exact-match fails, but endsWith-fallback matches `.claude/settings.json` (ends with `/settings.json`). This is the codex-flagged false-positive surface; v2 endsWith fallback CORRECTLY allows this PASS. Net commit BLOCKs on the SKILL.md violation while not false-flagging on settings.json:206.

**Result**: ✅ PASS — hook exits 2 with violation `APPLIED claim path 'SKILL.md' not in staged set`.

## TC3 — W327 legitimate ship (d6087ec)

**Expected**: PASS (exit 0)

**Examined bullet lines**:
- Line 29: `- Stream C provenance-lint codify APPLIED (docs/architecture/W327-PROVENANCE-LINT/):` — paren-wrapped form. F3 regex `[^[:space:](:]` deliberately excludes lines where `APPLIED` is followed by a `(` (treats parens as descriptive context). PASS.
- Line 37: `  - Recovery form: VERIFIED-ALREADY-APPLIED (sha): path validated against` — template description, no concrete sha (literal token `sha`). VERIFIED-ALREADY-APPLIED handler skips it because the literal `(sha)` does not parse as a 7-40-hex sha.

No false-positives. Hook exits 0.

**Result**: ✅ PASS — exit 0.

## TC4 — W327-codex-r1 legitimate ship (6ee7ea4)

**Expected**: PASS (exit 0)

**Examined bullet lines**:
- Line 23 `Stream A applied THIS COMMIT:` — prose line (no leading bullet), excluded by prose-mode rule.
- Lines 24-27 (the `- .claude/skills/...` bullets) contain real path tokens but NO `APPLIED` keyword on the same line — no F1-F5 match → no claim to validate.
- Line 26 `apply` substring appears in `applied` participle within line 23 (already prose-excluded). No false-positive.

**Note**: TC4 spec text mentions "VERIFIED-ALREADY-APPLIED claim for sca-v11" — actual commit body does NOT contain that token (verified via `grep -n VERIFIED tmp/w328-c/msg-6ee7ea4.txt`). The commit is legitimate because Stream A genuinely staged the sca-v11 SKILL.md edits THIS COMMIT, so no recovery-form token was needed. Hook PASS regardless.

**Result**: ✅ PASS — exit 0.

## TC5 — prose-mode-only mention (synthetic, `tmp/w328-c/msg-tc5-prose.txt`)

**Expected**: PASS (exit 0)

**Inputs**:
- Commit subject: `ship(W328-test): TC5 prose-mode-exclusion smoke`
- Body prose includes the tokens `APPLIED:`, `APPLIED settings.json:154`, `APPLIED THIS COMMIT: foo/bar.md` — ALL in prose paragraphs (no leading bullet marker).
- The single bullet line `- Real claim: docs/...W328-C-1-DESIGN-SPEC-V2.md updated` contains NO `APPLIED` token.
- Staged set: `docs/architecture/W328-PROVENANCE-LINT-V2/W328-C-1-DESIGN-SPEC-V2.md` + `.pre-commit-config.yaml`.

**Why it should PASS**: prose-mode rule excludes all non-bullet, non-subject lines from claim scanning. Bullet line has no claim token. No VERIFIED-ALREADY-APPLIED token. Hook exits 0.

**Result**: ✅ PASS — exit 0.

---

## NEG-CONTROL (defense-in-depth)

**Inputs**: `tmp/w328-c/msg-neg-control.txt` + `tmp/w328-c/files-neg-control.txt`
**Bullet claims**: F1 `APPLIED: phantom-file-not-staged.md` (fake), F3 `APPLIED real-staged.md` (real), F4 `APPLIED to also-fake.md` (fake).
**Expected**: BLOCK with two violations.
**Result**: ✅ exit 2; violations recorded for phantom-file-not-staged.md (F1) and also-fake.md (F4); real-staged.md (F3) PASSES because it IS in staged set.

## SUBJECT-CLAIM (defense-in-depth)

**Inputs**: `tmp/w328-c/msg-subject-claim.txt` (subject line: `ship(W328): APPLIED: phantom.md ...`) + same neg-control files (no `phantom.md`).
**Expected**: BLOCK on subject-line claim.
**Result**: ✅ exit 2; violation recorded.

---

## Summary

| TC | SHA / Synthetic | Expected | Observed | Status |
|----|-----------------|----------|----------|--------|
| TC1 | `5cac3ec` (W320) | BLOCK | exit 2 | ✅ |
| TC2 | `670423d` (W326) | BLOCK | exit 2 | ✅ |
| TC3 | `d6087ec` (W327) | PASS | exit 0 | ✅ |
| TC4 | `6ee7ea4` (W327-codex-r1) | PASS | exit 0 | ✅ |
| TC5 | prose-mode synth | PASS | exit 0 | ✅ |
| NEG | neg-control synth | BLOCK | exit 2 | ✅ |
| SUBJ | subject-claim synth | BLOCK | exit 2 | ✅ |

**Net**: 7/7 PASS (5/5 spec test cases + 2/2 defense-in-depth).

Real-history coverage: **2/2** historical races (W320 + W326 SKILL.md leg) caught + **2/2** legitimate ships (W327 + W327-codex-r1) preserved. Closes codex round-1-r2-r3 finding 2 (`tmp/w328-c/msg-6ee7ea4.txt` lines 11-14): "Test vectors used normalized paths; did not prove real-history replay against actual 5cac3ec + 670423d commits."

# W328-C-4 — Smoke results vs real-history commits

**Wave**: W328 Stream C
**Date**: 2026-05-19
**Hook under test**: live entry extracted from post-edit `.pre-commit-config.yaml` (W328-C-3-DIFF-APPLIED.md §3)
**Runner**: `tmp/w328-c/smoke-runner.sh` (parses YAML via PyYAML; runs entry with `git diff --staged` shim returning historical file lists)

---

## Test matrix

| # | Test | Inputs | Expected | Observed (exit code) | Status |
|---|------|--------|----------|----------------------|--------|
| 1 | TC1 W320 historical race | `msg-5cac3ec.txt` + `files-5cac3ec.txt` | BLOCK (exit 2) | exit 2 | ✅ |
| 2 | TC2 W326 historical race | `msg-670423d.txt` + `files-670423d.txt` | BLOCK (exit 2) | exit 2 | ✅ |
| 3 | TC3 W327 legitimate ship | `msg-d6087ec.txt` + `files-d6087ec.txt` | PASS (exit 0) | exit 0 | ✅ |
| 4 | TC4 W327-codex-r1 legit | `msg-6ee7ea4.txt` + `files-6ee7ea4.txt` | PASS (exit 0) | exit 0 | ✅ |
| 5 | TC5 prose-mode only | `msg-tc5-prose.txt` + `files-tc5-prose.txt` | PASS (exit 0) | exit 0 | ✅ |
| 6 | NEG-control synthetic | `msg-neg-control.txt` + `files-neg-control.txt` | BLOCK (exit 2) | exit 2 | ✅ |
| 7 | SUBJ-claim synthetic | `msg-subject-claim.txt` + `files-neg-control.txt` | BLOCK (exit 2) | exit 2 | ✅ |

**Net**: 7/7 PASS. (5/5 spec test cases + 2/2 defense-in-depth.)

---

## Raw smoke output (verbatim)

### TC1 — W320 5cac3ec (expect BLOCK)
```
W328-C provenance-lint v2: BLOCK
APPLIED no-colon claim settings.json:154 not in staged set [line:   - D1 M6 PreCompact silent-fallback APPLIED settings.json:154 (15964 to 16025B).]
exit=2
```

### TC2 — W326 670423d (expect BLOCK)
```
W328-C provenance-lint v2: BLOCK
APPLIED claim SKILL.md not in staged set [line:   - APPLIED: SKILL.md §7 install denom math fix 33.7 -> 34.7 (root cause:]
exit=2
```

**Critical observation**: only ONE violation reported (SKILL.md). The W326 commit's `APPLIED: settings.json:206` claim (line 10) was tested by the hook BUT the endsWith fallback (shell case `*/settings.json`) successfully matched against the staged `.claude/settings.json`. This is the codex-flagged false-positive surface — v2 correctly avoids false-flagging the legitimate F1 path-prefix claim while still BLOCKing the genuine race (SKILL.md).

### TC3 — W327 d6087ec (expect PASS)
```
exit=0
```

W327 message has `APPLIED (docs/architecture/W327-PROVENANCE-LINT/):` (paren-form). v2 F3 no-colon regex `[^[:space:](:]` explicitly excludes `(`-prefixed tokens, treating parens as descriptive context not file-claims. No claim triggered → PASS.

### TC4 — W327-codex-r1 6ee7ea4 (expect PASS)
```
exit=0
```

Message contains `Stream A applied THIS COMMIT:` (prose line, no bullet marker) — excluded by prose-mode rule. Subsequent bullets list real staged paths but contain NO `APPLIED` keyword on the bullet line, so no F1-F5 trigger. No `VERIFIED-ALREADY-APPLIED (<sha>)` token present. No claims to validate → PASS.

### TC5 — prose-mode synthetic (expect PASS)
```
exit=0
```

Synthetic commit body discusses `APPLIED:`, `APPLIED settings.json:154`, `APPLIED THIS COMMIT: foo/bar.md` purely in PROSE paragraphs (no leading `-` or `*`). The single bullet line contains no `APPLIED` keyword. Prose-mode rule excludes all 3 prose mentions → PASS.

### NEG — defense-in-depth synthetic (expect BLOCK)
```
W328-C provenance-lint v2: BLOCK
APPLIED claim phantom-file-not-staged.md not in staged set [line: - A1 APPLIED: phantom-file-not-staged.md fake change]
APPLIED-to claim also-fake.md not in staged set [line: - C3 APPLIED to also-fake.md]
exit=2
```

Bullet lines: A1 (F1) BLOCKs, B2 (F3) PASSES because `real-staged.md` IS in staged set, C3 (F4 `APPLIED to`) BLOCKs. Two violations, exit 2.

### SUBJ — subject-line-claim synthetic (expect BLOCK)
```
W328-C provenance-lint v2: BLOCK
APPLIED claim phantom.md not in staged set [line: ship(W328): APPLIED: phantom.md subject-line false claim]
exit=2
```

Confirms subject line (line 1) is treated as claim-eligible regardless of bullet-marker presence (consistent with claim-line filter logic).

---

## Coverage analysis

- **Historical-race coverage**: 2/2 — W320 settings.json:154 (TC1) + W326 SKILL.md §7 (TC2) both BLOCK.
- **Legitimate-commit coverage**: 2/2 — W327 d6087ec (TC3) + W327-codex-r1 6ee7ea4 (TC4) both PASS (no false-positives).
- **Self-trigger regression**: TC5 confirms the W327 self-trigger surface is closed (prose mentions don't trigger).
- **False-positive surface (codex r1 finding)**: TC2 inner verification — `settings.json:206` vs `.claude/settings.json` mismatch resolved by endsWith fallback; no false-positive.
- **Negative control**: NEG/SUBJ confirm the hook still BLOCKs novel false claims in 3 forms (F1, F4, subject).

---

## Closure on codex round-1-r2-r3 carry-over

Codex finding 1 (regex narrow): **CLOSED** — F2-F5 forms added, TC1 demonstrates W320 no-colon form is now caught.
Codex finding 2 (test vectors used normalized paths): **CLOSED** — real-history replay against 5cac3ec + 670423d (TC1+TC2) demonstrates the v2 hook correctly distinguishes race vs legitimate at the actual historical commit boundary.

## Closure on W327 self-trigger

W327 commit `6ee7ea4` body lines 47-50 noted: "pre-commit hook self-triggered on prose text containing literal claim-prefix tokens. Reworded message above to avoid false-positive. W328-E will add prose-mode exclusion to the regex". TC5 + the W328-C-1 design spec §4 deliver this — verified PASS.

---

## Test artifact paths (reproducibility)

All inputs live under `Z:/claude-sota-installed/tmp/w328-c/`:
- `msg-5cac3ec.txt`, `files-5cac3ec.txt`
- `msg-670423d.txt`, `files-670423d.txt`
- `msg-d6087ec.txt`, `files-d6087ec.txt`
- `msg-6ee7ea4.txt`, `files-6ee7ea4.txt`
- `msg-tc5-prose.txt`, `files-tc5-prose.txt`
- `msg-neg-control.txt`, `files-neg-control.txt`
- `msg-subject-claim.txt` (reuses `files-neg-control.txt`)
- `smoke-runner.sh` (test driver)
- `hook-v2-prototype.sh` (multi-line readable prototype; logically equivalent to YAML entry)

To reproduce locally: `for tc in 5cac3ec 670423d d6087ec 6ee7ea4; do bash tmp/w328-c/smoke-runner.sh tmp/w328-c/msg-$tc.txt tmp/w328-c/files-$tc.txt; echo "exit=$?"; done` and the 3 additional tests. Note the runner depends on PyYAML + Git Bash on Windows (`/mingw64/bin/git`).

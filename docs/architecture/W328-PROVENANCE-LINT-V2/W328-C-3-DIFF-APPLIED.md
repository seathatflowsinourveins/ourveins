# W328-C-3 — `.pre-commit-config.yaml` before/after diff

**Wave**: W328 Stream C
**Date**: 2026-05-19
**File modified**: `Z:/claude-sota-installed/.pre-commit-config.yaml`
**Size delta**: 5096 → 7791 bytes (+2695, +52.9%)
**Snapshots**:
- Before: `tmp/w328-c/precommit-before.yaml` (the v1 hook, equivalent to repo state at HEAD `2c48b1e`)
- After: `tmp/w328-c/precommit-after.yaml` (the v2 hook applied this stream)

---

## 1. Comment-block diff

### BEFORE (v1, W327-C lines 68-78)

```
      # W327-C — provenance lint (multi-session race detector, commit-msg stage)
      # Cite anchors (3-org-distinct, EXTERNAL-DOMINANT):
      #   1. Conventional Commits 1.0.0 (community spec) — body-line claim surface
      #   2. SLSA v1.0 build-provenance (Linux Foundation OpenSSF WG) — attestation-pre-merge pattern
      #   3. GitHub commit-signature verification (GitHub Inc.) — structural + identity binding model
      # Internal precedent (non-gate): W317-A Δ34 supersession-chain lint @ PreToolUse[Edit|Write]
      #   (docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SHIP-LOG.md:12-46).
      # Motivation: W320-codex-r1 (settings.json M6) + W326-codex-r1 (SKILL.md §7) parallel-session
      #   race occurrences where ship-message falsely claimed APPLIED for changes landed in parallel
      #   commits (8e43c24 + e1a7ec6 respectively). See W327-PROVENANCE-LINT/ for full design.
      # Smoke-verified: 6/6 test vectors PASS against real git history (W327-C-4 + W327-C-5).
```

### AFTER (v2, W328-C lines 68-88)

```
      # W327-C / W328-C — provenance lint (multi-session race detector, commit-msg stage)
      # Cite anchors (3-org-distinct, EXTERNAL-DOMINANT):
      #   1. Conventional Commits 1.0.0 (community spec) — body-line claim surface
      #   2. SLSA v1.0 build-provenance (Linux Foundation OpenSSF WG) — attestation-pre-merge pattern
      #   3. GitHub commit-signature verification (GitHub Inc.) — structural + identity binding model
      # Internal precedent (non-gate): W317-A Δ34 supersession-chain lint @ PreToolUse[Edit|Write]
      #   (docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SHIP-LOG.md:12-46).
      # Motivation: W320 (settings.json:154 no-colon race) + W326 (SKILL.md §7 false-claim race;
      #   settings.json:206 path-prefix near-miss) parallel-session occurrences where the
      #   ship-message falsely claimed APPLIED for changes landed in parallel commits.
      # W328-C upgrade (codex round-1-r2-r3 carry-over closure): regex extended to 5 claim forms
      #   (F1 APPLIED:<path>, F2 APPLIED THIS COMMIT:<path>, F3 APPLIED <path> no-colon,
      #   F4 APPLIED to <path>, F5 apply <verb> to <path>); path normalization strips trailing
      #   `:<linenum>` suffixes + sentence-punctuation + leading paren; endsWith fallback (shell
      #   case-glob `*/<p>`) closes `settings.json` vs `.claude/settings.json` mismatch surface;
      #   prose-mode exclusion (only subject line + bullet/numbered lines are claim-lines)
      #   closes the W327 self-trigger surface. Smoke-verified: 7/7 PASS = 5 spec test cases
      #   (TC1 W320 5cac3ec BLOCK; TC2 W326 670423d BLOCK; TC3 W327 d6087ec PASS;
      #   TC4 W327-codex-r1 6ee7ea4 PASS; TC5 prose-only PASS) + 2 defense-in-depth
      #   (NEG-control BLOCK; subject-claim BLOCK). See W328-PROVENANCE-LINT-V2/ for design,
      #   real-history test results, and v1->v2 diff.
```

## 2. Hook id/name diff

- `id: provenance-lint` — unchanged (preserves hook stability for downstream tooling)
- `name: provenance-lint (W327-C)` → `name: provenance-lint (W328-C)` (wave-tag bump)

## 3. Entry diff (high-level)

The single-line bash entry was rewritten end-to-end. Salient v1 → v2 deltas:

| Aspect | v1 (W327-C) | v2 (W328-C) |
|--------|-------------|-------------|
| Claim regex | `APPLIED( THIS COMMIT)?:[[:space:]]*[^[:space:]]+` (single form) | 4 distinct ERE patterns covering F1-F4 + a 5th descriptive form (F5) |
| Claim-line filter | none — every body line scanned | Subject-line OR bulleted/numbered list line only (prose-mode exclusion) |
| Path normalization | `sed -E "s/^[^:]+:[[:space:]]*//"` strip-prefix only | Strip trailing `(:\d+)+` + strip trailing `[.,;:)]+` + strip leading `(` |
| Staged match | `grep -Fxq "$p"` exact-fixed-string only | `grep -Fxq` first; on miss, shell-case `*/<p>` endsWith fallback |
| Path-like guard | none (false-positive on `§...` section anchors) | `grep -qE "[./]"` rejects pseudo-paths (no `.` AND no `/`) |
| VERIFIED-ALREADY-APPLIED | whole-message scan (no claim-line filter) | unchanged; verified-claim semantics identical to v1 |
| Violation output | per-violation `printf >&2` (line-by-line) | accumulator `viol="<msg>|<msg>"`, flushed `tr "|" "\n"` at end |
| CLI arg | hardcoded `.git/COMMIT_EDITMSG` | `"${1:-.git/COMMIT_EDITMSG}"` — accepts pre-commit-passed COMMIT_EDITMSG path (production canonical; falls back to default for hand-invocation) |

## 4. Entry diff (line-by-line)

Raw before/after entry strings preserved at:
- `tmp/w328-c/precommit-before.yaml:84` (1297-char v1 entry)
- `tmp/w328-c/precommit-after.yaml:95` (2674-char v2 entry)

Character-count delta: +1377 chars (+106%). All growth is new behavior: 4 additional claim-form blocks, sm() helper function, prose-mode line filter, violation accumulator.

## 5. Behavioral invariants preserved

- **Same hook id** — downstream `.pre-commit-hooks.yaml` consumers see no breaking change.
- **Same stage** — `commit-msg` (not `pre-commit`), avoids race with file-content checks.
- **Same exit semantics** — 0 = PASS, 2 = BLOCK (matches v1; commitlint sibling uses 1 for lint errors so the 2-vs-1 ambiguity preserved).
- **Same `pass_filenames: false`** — pre-commit appends no positional args except the COMMIT_EDITMSG (commit-msg stage convention).
- **`always_run: true`** — hook fires on every commit message (no path-filter dependency).
- **VERIFIED-ALREADY-APPLIED behavior** — byte-identical to v1.

## 6. Cardinal-rule compliance (re-asserted at W328 ship)

- **R1 trusted primitives**: pre-commit framework (community canonical) + git CLI + POSIX shell utilities. No new dependencies.
- **R2 hooks discipline**: hook BODY embedded inline in `.pre-commit-config.yaml` (pre-commit framework canonical config file, NOT under `.claude/hooks/**`). Bash invokes direct CLI tools (`cat`, `git`, `grep`, `sed`, `tr`, `printf`). NO new file written under `.claude/hooks/**`. Compliant.
- **R3 subagents**: N/A.
- **R4 project-behavior surface**: `.pre-commit-config.yaml` modified; settings.json + `.claude/rules/*.md` untouched.
- **R5 safety boundaries**: enforcement via pre-commit framework, not custom guard scripts.

## 7. Validation

- `pre-commit validate-config` returns rc=0 against the post-edit `.pre-commit-config.yaml`.
- Live smoke-runner (`tmp/w328-c/smoke-runner.sh`) which extracts the entry from the LIVE config and runs it under a `git diff --staged` shim returning historical file lists: **7/7 PASS**.

## 8. Rollback procedure

If the v2 hook causes false-positive in production, rollback by `git checkout HEAD -- .pre-commit-config.yaml` (reverts to v1 state) OR by manual restoration from `tmp/w328-c/precommit-before.yaml`. The W328-PROVENANCE-LINT-V2 documentation directory may stay (audit trail).

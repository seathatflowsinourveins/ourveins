# W327 Stream C — Provenance Lint Test Plan

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **Target**: Option C (.pre-commit-config.yaml `provenance-lint` local hook) — 5 test cases per dispatch directive.

## Test Harness

All tests run against the same Option C bash heredoc body (per W327-C-3). Setup:

```bash
# Setup helper: stage commit message + diff env, invoke the lint body directly
run_lint() {
  local msg="$1"; shift
  local staged="$*"  # newline-separated file list (mocked)
  echo "$msg" > /tmp/COMMIT_EDITMSG.test
  # Inject mocked staged file list via env override (`git diff --staged --name-only` substitute)
  export __MOCK_STAGED="$staged"
  bash -c '
    msg=$(cat /tmp/COMMIT_EDITMSG.test);
    staged="$__MOCK_STAGED";
    bad=0;
    while IFS= read -r line; do
      p=$(echo "$line" | grep -oE -- "APPLIED( THIS COMMIT)?:[[:space:]]*[^[:space:]]+" | sed -E "s/^[^:]+:[[:space:]]*//");
      [ -z "$p" ] && continue;
      echo "$staged" | grep -Fxq "$p" || { echo "W327-C: APPLIED claim for $p but file not staged" >&2; bad=1; };
    done <<< "$msg";
    sha_lines=$(echo "$msg" | grep -oE "VERIFIED-ALREADY-APPLIED \\([0-9a-f]{7,40}\\):[[:space:]]*[^[:space:]]+" || true);
    while IFS= read -r line; do
      [ -z "$line" ] && continue;
      sha=$(echo "$line" | grep -oE "[0-9a-f]{7,40}");
      file=$(echo "$line" | sed -E "s/.*:[[:space:]]*//");
      [ "$(git cat-file -t $sha 2>/dev/null)" = "commit" ] || { echo "W327-C: VERIFIED SHA $sha invalid" >&2; bad=1; continue; };
      git show --name-only --pretty=format: $sha 2>/dev/null | grep -Fxq "$file" || { echo "W327-C: SHA $sha did not touch $file" >&2; bad=1; };
    done <<< "$sha_lines";
    [ $bad -eq 0 ] || exit 2;
    exit 0
  '
}
```

(In real deployment, `staged` comes from `git diff --staged --name-only`; the mock is for test-isolation only.)

## Test Cases

### Test 1 — Accurate APPLIED claim → PASS

**Input**:

```
msg="fix(W327): closure synthesis

- APPLIED: docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md
- APPLIED: docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md
"
staged="docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md
docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md"
```

**Expected**: exit 0, no stderr.

**Verifies**: 3.1 APPLIED-claim regex captures correctly + `grep -Fxq` exact-match validates path-in-staged.

---

### Test 2 — APPLIED claim with file NOT staged → BLOCK

**Input** (mimics W326 670423d false claim):

```
msg="ship(W326): 4-stream gap-resolution

- Stream A F1 APPLIED: .claude/settings.json
- Stream B APPLIED: .claude/skills/sota-convergence-audit/SKILL.md
"
staged=".claude/settings.json"  # SKILL.md NOT in staged set (parallel session landed it)
```

**Expected**: exit 2, stderr contains `W327-C: APPLIED claim for .claude/skills/sota-convergence-audit/SKILL.md but file not staged`.

**Verifies**: false-claim BLOCK behavior for the colon-prefix `APPLIED:` format. [NARROWED per W327 codex round-1]: actual W326-codex-r1 race used `APPLIED: settings.json:206` (path-prefix mismatch vs `.claude/settings.json` staged path) which the AS-SHIPPED hook would NOT detect; W328-E queued for path-normalization to cover this historical variant.

---

### Test 3 — VERIFIED-ALREADY-APPLIED with valid prior SHA → PASS

**Input** (the corrected form W326-codex-r1 should have used):

```
msg="ship(W326-codex-r1): provenance correction

- VERIFIED-ALREADY-APPLIED (e1a7ec6): .claude/skills/sota-convergence-audit/SKILL.md
- APPLIED: docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md
"
staged="docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md"
```

**Expected**: exit 0, no stderr (prior commit e1a7ec6 exists in repo + actually touched SKILL.md per real history).

**Verifies**: `git cat-file -t e1a7ec6 = commit` + `git show --name-only e1a7ec6 | grep -Fxq .claude/skills/sota-convergence-audit/SKILL.md` both succeed (validated against real git history above — e1a7ec6 ship(W325) META-FOUNDATION DID touch SKILL.md).

**Manual SHA verification** (pre-test):

```bash
git show --name-only --pretty=format: e1a7ec6 | grep -F 'SKILL.md'
# Expected: .claude/skills/sota-convergence-audit/SKILL.md
```

---

### Test 4 — VERIFIED-ALREADY-APPLIED with invalid SHA → BLOCK

**Input**:

```
msg="ship(W326-codex-r1): provenance correction

- VERIFIED-ALREADY-APPLIED (deadbee): .claude/skills/sota-convergence-audit/SKILL.md
"
staged=""
```

**Expected**: exit 2, stderr contains `W327-C: VERIFIED SHA deadbee invalid` (because `git cat-file -t deadbee` returns nothing — SHA does not resolve).

**Verifies**: invalid-SHA branch BLOCKs.

---

### Test 5 — No APPLIED claims → PASS-as-no-op

**Input** (normal Conventional Commits message without provenance claims):

```
msg="fix(W327): typo in docs

Fix a typo in the design spec.
"
staged="docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md"
```

**Expected**: exit 0, no stderr.

**Verifies**: messages without APPLIED / VERIFIED-ALREADY-APPLIED patterns are silently no-op'd; lint does not interfere with normal commit workflow.

---

### Test 6 (bonus) — VERIFIED-ALREADY-APPLIED with valid SHA but SHA did NOT touch cited file → BLOCK

**Input**:

```
msg="ship(W326-codex-r1): provenance correction

- VERIFIED-ALREADY-APPLIED (e1a7ec6): some/unrelated/file.txt
"
staged=""
```

**Expected**: exit 2, stderr contains `W327-C: SHA e1a7ec6 did not touch some/unrelated/file.txt`.

**Verifies**: SHA-existed-but-didn't-touch-cited-file branch BLOCKs.

---

## Expected Outcomes Summary

| Test | Expected exit | Expected stderr | Verifies |
|---|---|---|---|
| 1 | 0 | (none) | accurate-claim PASS |
| 2 | 2 | "APPLIED claim ... but file not staged" | false-claim BLOCK |
| 3 | 0 | (none) | valid prior-SHA PASS |
| 4 | 2 | "VERIFIED SHA ... invalid" | invalid-SHA BLOCK |
| 5 | 0 | (none) | no-claim no-op |
| 6 | 2 | "SHA ... did not touch ..." | wrong-SHA BLOCK |

## Smoke-Test Execution Strategy

Pre-apply smoke (Option C ship-gate):

1. Author the `.pre-commit-config.yaml` entry as a SEPARATE BRANCH or `--dry-run` overlay.
2. Run all 6 tests via the harness above with real `git cat-file` against current HEAD.
3. Verify 6/6 outcomes match expected.
4. If 6/6 PASS, apply to `.pre-commit-config.yaml` + commit (will trigger lint on its own commit message — recursive case where the apply commit's message uses APPLIED claim referring to `.pre-commit-config.yaml`, which IS in staged set → PASS expected).

## Negative Verification — Lint should NOT block normal commits

Real-repo-history negative tests (replaying actual commits from `git log` against the lint):

- `569080a` ship(W326-codex-r1) → message contains no APPLIED claim (closure-doc only). Expected: PASS-as-no-op (Test 5 path).
- `670423d` ship(W326) → message contains "APPLIED: SKILL.md" claim BUT git diff at HEAD^→HEAD does NOT contain SKILL.md. Expected: BLOCK (Test 2 path; this is precisely the case the lint is designed to catch).

**This is the load-bearing validation** — replaying real history shows the lint would have caught the very race pattern motivating W327 P0 #11.

## Operator Escape Hatch

If a commit MUST proceed despite lint BLOCK (false-positive case 5.1 from W327-C-1 §5.1), operator can:

- `git commit --no-verify` (bypasses pre-commit framework hook). **Caveat**: block-no-verify plugin (enabled at settings.json L257) checks PreToolUse:Bash for `--no-verify` and BLOCKs unless operator explicitly disables. This is defense-in-depth: 2 layers must be disabled.
- Edit commit message to remove the spurious APPLIED claim (preferred — operator discipline).
- Use VERIFIED-ALREADY-APPLIED form to reference the actual landing commit (the canonical recovery for multi-session-race cases).

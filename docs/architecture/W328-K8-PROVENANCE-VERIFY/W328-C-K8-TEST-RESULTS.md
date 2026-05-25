# W328 Stream-C — K-8 Provenance-Lint Verification Test Results

> **Wave**: W328 Stream-C (K-8)
> **Date**: 2026-05-19
> **HEAD baseline**: `6ee7ea4`
> **Scope**: Verify the W327-C provenance-lint hook (`.pre-commit-config.yaml:79-88`) actually BLOCKS the two known race patterns (W320-codex-r1, W326-codex-r1) and PASSES legitimate `VERIFIED-ALREADY-APPLIED` claims.
> **Method**: Idempotent bash harness at `$CLAUDE_JOB_DIR/k8-tests/run-tests.sh` executes the same lint body verbatim against synthetic commit-message fixtures + real git history.
> **Verdict**: **3/3 PASS** — hook is fit-for-purpose, validation logic matches W327-C-4 test plan.

---

## §1 Test setup

The lint body was extracted verbatim from `.pre-commit-config.yaml:84` (the `entry:` line of the `provenance-lint` hook). Only one substitution was made for test isolation:

- Real hook: `staged=$(git diff --staged --name-only)`
- Test harness: `staged="$__MOCK_STAGED"` (env-var injection)

All other logic — APPLIED-claim regex, VERIFIED-ALREADY-APPLIED SHA regex, `git cat-file -t` SHA-validity check, `git show --name-only --pretty=format:` cited-file-touched check, `exit 2` BLOCK semantics — is byte-identical to production hook.

Test harness lives in `$CLAUDE_JOB_DIR/k8-tests/` (job dir = `Z:\claude-sota-installed\.claude\jobs\39a4058d\`):

- `run-tests.sh` (idempotent driver; rerun-safe)
- `test-w320-race.txt` (Test 1 commit-message fixture)
- `test-w326-bad-sha.txt` (Test 2 commit-message fixture)
- `test-legitimate.txt` (Test 3 commit-message fixture)
- `results.txt` (run output)
- `test{1,2,3}_*.stderr` (per-test captured stderr)

---

## §2 Test cases

### Test 1 — W320-codex-r1 race simulation → BLOCK expected

**Race pattern** (per `CLAUDE.md:34` + `STREAM-C-SYNTHESIS.md:36`): W320-codex-r1 commit message falsely claimed `settings.json M6 PreCompact + PWF flip APPLIED`; the actual settings.json change landed in parallel-session W324 commit `8e43c24`. The original commit's staged-diff did NOT include `.claude/settings.json`.

**Fixture commit message** (`test-w320-race.txt`):
```
ship(W320-codex-r1): settings.json:env block applied

- APPLIED: .claude/settings.json
- APPLIED: docs/architecture/W320-WAVE/STREAM-A-SHIP-LOG.md
```

**Mocked staged-diff** (settings.json absent):
```
docs/architecture/W320-WAVE/STREAM-A-SHIP-LOG.md
```

**Expected**: exit 2 with stderr `W327-C: APPLIED claim for .claude/settings.json but file not staged`.

**Actual**: `[PASS] test1_w320_race: expected_exit=2 actual=2` — stderr `W327-C: APPLIED claim for .claude/settings.json but file not staged`.

**Verdict**: ✅ PASS — hook would have caught the W320-codex-r1 race **before commit** had it been in place.

---

### Test 2 — W326-codex-r1 invalid-SHA simulation → BLOCK expected

**Race pattern** (per `W327-C-4-TEST-PLAN.md:113-124`): an attempted `VERIFIED-ALREADY-APPLIED` recovery form must verify (a) the cited SHA actually resolves to a commit in repo history. A fabricated SHA (`deadbee`) must BLOCK.

**Fixture commit message** (`test-w326-bad-sha.txt`):
```
ship(W326-codex-r1): provenance correction

- VERIFIED-ALREADY-APPLIED (deadbee): .claude/skills/sota-convergence-audit/SKILL.md
- APPLIED: docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md
```

**Mocked staged-diff**:
```
docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md
```

**Expected**: exit 2 with stderr `W327-C: VERIFIED SHA deadbee invalid`.

**Actual**: `[PASS] test2_w326_bad_sha: expected_exit=2 actual=2` — stderr `W327-C: VERIFIED SHA deadbee invalid`.

**Verdict**: ✅ PASS — hook rejects fabricated SHAs.

---

### Test 3 — Legitimate VERIFIED-ALREADY-APPLIED form → PASS expected

**Recovery pattern** (per `W327-C-4-TEST-PLAN.md:84-107`): the canonical recovery form when a multi-session race produces a parallel landing is `VERIFIED-ALREADY-APPLIED (<sha>): <file>`. The hook must accept claims where (a) `git cat-file -t <sha> = commit`, and (b) `git show --name-only <sha>` includes `<file>`.

Real reference: SHA `e1a7ec6` (ship(W325) META-FOUNDATION) DID touch `.claude/skills/sota-convergence-audit/SKILL.md`.

**Fixture commit message** (`test-legitimate.txt`):
```
ship(W326-codex-r1): provenance correction

- VERIFIED-ALREADY-APPLIED (e1a7ec6): .claude/skills/sota-convergence-audit/SKILL.md
- APPLIED: docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md
```

**Mocked staged-diff**:
```
docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md
```

**Expected**: exit 0, no stderr.

**Actual**: `[PASS] test3_legitimate: expected_exit=0 actual=0`.

**Verdict**: ✅ PASS — legitimate recovery form is accepted.

---

## §3 Git verification cross-checks

Per W327-C-4 test plan, these are the load-bearing git-history-resolution operations the hook depends on. Executed against real repo HEAD `6ee7ea4`:

| Check | Command | Result |
|---|---|---|
| Reference SHA `e1a7ec6` resolves | `git cat-file -t e1a7ec6` | `commit` ✅ |
| Fabricated SHA `deadbee` rejected | `git cat-file -t deadbee` | `fatal: Not a valid object name deadbee` ✅ |
| `e1a7ec6` touched SKILL.md | `git show --name-only --pretty=format: e1a7ec6 \| grep -Fxq` | YES ✅ |
| `8e43c24` touched settings.json | `git show --name-only --pretty=format: 8e43c24 \| grep -Fxq` | YES ✅ |

All four git-side preconditions hold. The hook's validation logic correctly leverages them.

---

## §4 Pass/fail summary

| # | Test | Expected exit | Actual exit | Expected stderr fragment | Match? | Pass/Fail |
|---|---|---|---|---|---|---|
| 1 | W320-race APPLIED-claim without staged file | 2 | 2 | `APPLIED claim for .claude/settings.json but file not staged` | ✅ | **PASS** |
| 2 | W326-race invalid SHA in VERIFIED-ALREADY-APPLIED | 2 | 2 | `VERIFIED SHA deadbee invalid` | ✅ | **PASS** |
| 3 | Legitimate VERIFIED-ALREADY-APPLIED (e1a7ec6→SKILL.md) | 0 | 0 | (none) | ✅ | **PASS** |

**3/3 PASS**. Hook validation logic matches the W327-C-4 test plan expected outcomes (test 2, 4, 3 respectively in that plan's numbering).

---

## §5 Confidence + scope notes

- **Scope verified**: synthetic commit-message body parsing + real-git-history SHA resolution + cited-file-presence-in-diff. Both bad-claim branches (APPLIED file not staged; VERIFIED SHA invalid) and the legitimate VERIFIED branch are exercised.
- **Scope NOT verified** in this stream: pre-commit-framework invocation (`pre-commit run --hook-stage commit-msg provenance-lint --commit-msg-filename ...`). The W327-C-5 ship doc reports 5/5 framework end-to-end tests PASS at apply time. This stream's brief was to re-verify the validation logic, not the framework plumbing.
- **Bypass-safety**: pre-commit framework hooks are bypassable via `git commit --no-verify`. Per `.pre-commit-config.yaml:79-88` operator note + `STREAM-C-SYNTHESIS.md:58`, defense-in-depth comes from the `block-no-verify` plugin (settings.json L257) which checks PreToolUse:Bash for `--no-verify` flag.
- **Rerun-safety**: harness clobbers fixture files on each invocation; results file truncated at start. No state leaks between runs.

---

## §6 Cite anchors (3-org-distinct, EXTERNAL-DOMINANT)

Reaffirms the W327-C-2 anchor set (verified org-disjoint):

1. **Conventional Commits 1.0.0** (community spec, LF-adjacent): https://www.conventionalcommits.org/en/v1.0.0/ — body-line claim surface (`APPLIED:` lines are conventional body footers).
2. **SLSA v1.0 build-provenance** (Linux Foundation OpenSSF SLSA WG): https://slsa.dev/spec/v1.0/provenance — attestation-pre-merge pattern (pre-commit hooks enforce attestation correctness before the SHA exists).
3. **GitHub commit-signature verification** (GitHub Inc.): https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification — structural binding model (the cited prior SHA is the binding artifact).

---

## §7 Recommendation forward

The provenance-lint hook is **fit-for-purpose for shipping**. No code or hook changes recommended. The validation logic correctly:

1. Blocks APPLIED-claim races (Test 1).
2. Blocks fabricated SHAs in VERIFIED-ALREADY-APPLIED (Test 2).
3. Passes legitimate post-race acknowledgments (Test 3).

K-8 verification complete. The W326-codex-r1 race motivating its addition would have been caught had this hook been in place at W320.

---

## §8 Artifacts

- Test harness: `$CLAUDE_JOB_DIR/k8-tests/run-tests.sh` (idempotent)
- Results log: `$CLAUDE_JOB_DIR/k8-tests/results.txt`
- Per-test stderr captures: `$CLAUDE_JOB_DIR/k8-tests/test{1,2,3}_*.stderr`
- Hook under test: `.pre-commit-config.yaml:79-88` (provenance-lint entry)
- Test plan reference: `docs/architecture/W327-PROVENANCE-LINT/W327-C-4-TEST-PLAN.md`
- Synthesis context: `docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md`

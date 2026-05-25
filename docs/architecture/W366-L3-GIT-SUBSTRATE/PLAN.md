# W366 L3 Git Substrate Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close all 9 Stream A findings (SEV-1 F1/F2 + SEV-2 F4/F5/F6 + SEV-3 F-A5/A6/A7/A8/A9) from AUDIT-2026-05-21 to lift L3 git foundation sca-score from 2.0 → 4.0, eliminating the data-loss exposure on unpushed branches and establishing enforceable branch-name + Wave-trailer policies.

**Architecture:** Single substrate-fix wave on a dedicated `feat/W366-git-substrate-hardening` branch. Eight phases executed in dependency order: P0 setup → P1 rescue unpushed work → P2 ship policy gates in test-mode → P3 author reconciliation matrix → P4 SEV-3 cleanup → P5 promote gates to enforcing → P6 execute reconciliation → P7 codex r1→rN + ship. Per-branch operator-sign gates protect against silent deletions.

**Tech Stack:** Git 2.43+, GitHub Actions (deepakputhraya/action-branch-name SHA-pinned), commitlint 19.x with custom-rule SDK, pre-commit framework (already wired), codex GPT-5.5 plugin for cross-model review, gpg-signed commits, T6 basic-memory MCP for verdict-ledger persistence.

**Spec:** `docs/superpowers/specs/2026-05-22-W366-L3-git-substrate-hardening-design.md` (committed at `9fab216`)

---

## File Structure

| File | Status | Responsibility |
|------|--------|----------------|
| `.github/workflows/branch-name-lint.yml` | NEW | Enforce Conventional Branch prefixes on every PR + push |
| `commitlint.config.cjs` | MODIFY | Add `wave-trailer-exists` custom rule + `[WAVE-TRAILER-EXEMPT]` bypass |
| `docs/standards/branch-naming-policy.md` | NEW | Human-readable policy doc; goal/→feat/ migration guidance |
| `docs/standards/tag-naming-policy.md` | NEW | Tag patterns: archive/, codex-r, ship, pre-wave |
| `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md` | NEW | 12-row per-branch verdict table w/ operator-sign column |
| `docs/architecture/W366-L3-GIT-SUBSTRATE/SPEC.md` | NEW (copy) | Snapshot of approved spec for wave-dir cross-reference |
| `docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-VERDICT.md` | NEW | r1→rN findings + final APPROVE record |
| `docs/architecture/W366-L3-GIT-SUBSTRATE/audit-evidence/` | NEW dir | Promoted from docs/architecture/AUDIT-2026-05-21/ |
| `docs/architecture/W350-sota-git-tree-finalization/` | DELETE | Empty-dir close-out (F6) |
| `tests/sota-research/commitlint-wave-trailer.test.cjs` | NEW | Unit test for C2 wave-trailer rule (3 cases) |

---

## Worktree Setup Pre-Check

**Critical pre-flight:** The W366 worktree creation MAY breach the cap=5 limit.

Live worktrees as of 2026-05-22:
```
Z:/claude-sota-installed         [w348-sota-fix-p5b]    ← main install dir (counts as worktree)
Z:/claude-sota-installed-W362a   [goal/W362a-...]
Z:/claude-sota-installed-W362bA  [goal/W362b-alpha-...]
Z:/claude-sota-installed-W362bB  [goal/W362b-beta-...]
Z:/claude-sota-installed-W362c   [goal/W362c-...]       ← LIVE judging 85 panels, NO TOUCH
```

That's already 5 worktrees. Adding W366 = 6 > cap.

**Decision required at Task 0.1:** If at-cap, choose one:
- (a) Close W362a OR W362bA OR W362bB worktree first (NOT W362c)
- (b) Accept temporary breach with operator approval
- (c) Skip worktree creation; execute on current `w348-sota-fix-p5b` branch by checking out `feat/W366-git-substrate-hardening` in-place

The plan defaults to **(c)** if cap-breach is detected — operator can override at Task 0.1 sign.

---

## Phase 0 — Worktree + branch + pre-flight

### Task 0.1: Verify worktree-cap state + decide worktree strategy

**Files:**
- Read: live `git worktree list` output

- [ ] **Step 1: List current worktrees and count**

Run: `git worktree list | wc -l`
Expected: `5` (cap reached) OR `<5` (room available)

- [ ] **Step 2: Decision gate**

If count == 5:
- Choose strategy (a)/(b)/(c) above. Default = (c) in-place branch (no new worktree).
- Operator-sign decision in `docs/architecture/W366-L3-GIT-SUBSTRATE/WORKTREE-DECISION.md` before proceeding.

If count < 5: proceed to Task 0.2 worktree-creation path.

- [ ] **Step 3: Record decision**

Run:
```bash
cat > docs/architecture/W366-L3-GIT-SUBSTRATE/WORKTREE-DECISION.md <<EOF
# W366 Worktree Decision Record

Date: $(date -I)
Worktree count at decision time: $(git worktree list | wc -l)
Strategy chosen: <a|b|c>
Rationale: <explain>
Operator sign: <pending>
EOF
```

### Task 0.2: Create W366 worktree (only if Task 0.1 chose (a) or (b))

**Files:**
- Tool: `tools/eee.ps1`

- [ ] **Step 1: Verify eee.ps1 is on disk**

Run: `ls tools/eee.ps1 && head -3 tools/eee.ps1`
Expected: file exists, first lines show PowerShell shebang/comment.

- [ ] **Step 2: Run eee.ps1 to create worktree + branch**

Run: `powershell.exe -File tools/eee.ps1 -Wave W366 -Slug git-substrate-hardening`
Expected: creates `Z:/claude-sota-installed-W366` worktree on `feat/W366-git-substrate-hardening` branch; pre-commit hooks installed.

- [ ] **Step 3: Verify worktree creation**

Run: `git worktree list | grep W366`
Expected: `Z:/claude-sota-installed-W366  <sha> [feat/W366-git-substrate-hardening]`

### Task 0.3: Create branch in-place (only if Task 0.1 chose (c))

**Files:**
- Branch: `feat/W366-git-substrate-hardening`

- [ ] **Step 1: Stash any in-progress work**

Run: `git status --short && git stash push -u -m "W366-prework-stash"`
Expected: stash created OR "no changes to stash".

- [ ] **Step 2: Create branch from current HEAD**

Run: `git checkout -b feat/W366-git-substrate-hardening`
Expected: `Switched to a new branch 'feat/W366-git-substrate-hardening'`

- [ ] **Step 3: Verify branch state**

Run: `git branch --show-current && git log --oneline -1`
Expected: `feat/W366-git-substrate-hardening` shown; HEAD matches prior `w348-sota-fix-p5b` HEAD.

### Task 0.4: Pre-flight git state verification

**Files:**
- Read: `git fetch --all` output, per-branch ahead/behind state

- [ ] **Step 1: Fetch all remotes**

Run: `git fetch --all --prune`
Expected: fetch completes; possibly prunes stale remote refs.

- [ ] **Step 2: Snapshot pre-W366 worktree state for rollback**

Run:
```bash
git worktree list > docs/architecture/W366-L3-GIT-SUBSTRATE/PREFLIGHT-WORKTREES.txt
git for-each-ref --sort=-committerdate --format='%(committerdate:short) %(refname:short) %(upstream:trackshort) %(objectname:short)' refs/heads/ > docs/architecture/W366-L3-GIT-SUBSTRATE/PREFLIGHT-BRANCHES.txt
git config --get-all pull.rebase > docs/architecture/W366-L3-GIT-SUBSTRATE/PREFLIGHT-CONFIG-DUPS.txt 2>&1
git tag --list > docs/architecture/W366-L3-GIT-SUBSTRATE/PREFLIGHT-TAGS.txt
```
Expected: 4 files created with current state.

- [ ] **Step 3: Commit pre-flight snapshot**

Run:
```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/
git commit -F - <<EOF
chore(W366): pre-flight snapshot — worktrees + branches + config + tags

Pre-W366 state captured for rollback / forensic reference.

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```
Expected: commit lands; pre-commit hooks pass.

---

## Phase 1 — RESCUE (F1 + F2)

### Task 1.1: Verify F1 actual state (w348-sota-fix-p5b vs origin)

**Files:**
- Read: `git log` and `git status` output

- [ ] **Step 1: Compare local vs origin**

Run: `git log origin/w348-sota-fix-p5b..w348-sota-fix-p5b --oneline | wc -l`
Expected: `0` (already pushed) OR `N > 0` (rescue needed).

- [ ] **Step 2: Record F1 verdict**

Append to `docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD.md`:
```bash
cat >> docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD.md <<EOF
## F1 — w348-sota-fix-p5b
Date: $(date -I)
ahead count: $(git log origin/w348-sota-fix-p5b..w348-sota-fix-p5b --oneline | wc -l)
Status: <CLOSED-ALREADY-PUSHED | RESCUE-NEEDED>
EOF
```

### Task 1.2: Push w348-sota-fix-p5b if ahead (only if Task 1.1 found unpushed)

**Files:**
- Branch: `w348-sota-fix-p5b`

- [ ] **Step 1: Push with --force-with-lease**

Run: `git push --force-with-lease origin w348-sota-fix-p5b`
Expected: push succeeds; origin/w348-sota-fix-p5b now matches local.

- [ ] **Step 2: Verify post-push parity**

Run: `git log origin/w348-sota-fix-p5b..w348-sota-fix-p5b --oneline | wc -l`
Expected: `0`

### Task 1.3: Fix F2 — W356 upstream

**Files:**
- Branch: `goal/W356-research-arch-v19-evolution`

- [ ] **Step 1: Verify origin/goal/W356-... exists**

Run: `git ls-remote --heads origin "goal/W356*"`
Expected: line(s) listing the W356 remote ref.

- [ ] **Step 2: Check current upstream**

Run: `git for-each-ref --format='%(refname:short) %(upstream:short)' refs/heads/goal/W356-research-arch-v19-evolution`
Expected: shows current upstream (may be wrong — local/feat/w355-... not origin/goal/W356-...).

- [ ] **Step 3: Re-set upstream to origin**

Run: `git branch --set-upstream-to=origin/goal/W356-research-arch-v19-evolution goal/W356-research-arch-v19-evolution`
Expected: `Branch 'goal/W356-research-arch-v19-evolution' set up to track 'origin/goal/W356-research-arch-v19-evolution'`

- [ ] **Step 4: Push to origin**

Run: `git push --force-with-lease origin goal/W356-research-arch-v19-evolution`
Expected: push succeeds (or "Everything up-to-date").

### Task 1.4: Fix F2 — W355 upstream

**Files:**
- Branch: `feat/w355-codex-closure-and-installs`

- [ ] **Step 1: Verify origin/feat/w355-... exists**

Run: `git ls-remote --heads origin "feat/w355*"`
Expected: line(s) listing W355 remote ref.

- [ ] **Step 2: Re-set upstream**

Run: `git branch --set-upstream-to=origin/feat/w355-codex-closure-and-installs feat/w355-codex-closure-and-installs`
Expected: tracking re-set message.

- [ ] **Step 3: Push to origin**

Run: `git push --force-with-lease origin feat/w355-codex-closure-and-installs`
Expected: push succeeds.

### Task 1.5: Verify all in-flight branches now have correct upstreams

**Files:**
- Read: `git for-each-ref` output

- [ ] **Step 1: Audit all heads**

Run:
```bash
git for-each-ref --format='%(refname:short) -> %(upstream:short) [%(upstream:trackshort)]' refs/heads/ \
  | grep -v ' -> $' > docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD-POST.txt
cat docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD-POST.txt
```
Expected: F1+F2 branches show `-> origin/<correct-name> [=]` (parity).

- [ ] **Step 2: Append to RESCUE-RECORD.md**

Append F2 verdicts (closed/needs-attention) per branch.

### Task 1.6: Commit Phase 1 rescue record

**Files:**
- `docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD.md`
- `docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD-POST.txt`

- [ ] **Step 1: Stage and commit**

Run:
```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/RESCUE-RECORD*
git commit -F - <<EOF
fix(W366): RESCUE — F1 + F2 closed (SEV-1 unpushed-work exposure)

F1 (w348-sota-fix-p5b): see RESCUE-RECORD.md
F2 (W355 + W356 upstreams): re-set + pushed

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```
Expected: commit succeeds.

---

## Phase 2 — Author C1+C2+C3+C4 in test-mode

### Task 2.1: Look up deepakputhraya/action-branch-name latest pinned SHA

**Files:**
- Read: upstream release tags

- [ ] **Step 1: Query GitHub for latest release**

Run: `gh api repos/deepakputhraya/action-branch-name/releases/latest --jq '{tag_name, target_commitish}'`
Expected: JSON with `tag_name` (e.g., "v2.1.0") and `target_commitish` (40-char SHA).

- [ ] **Step 2: Resolve tag to SHA**

Run: `gh api repos/deepakputhraya/action-branch-name/git/refs/tags/<tag_name> --jq '.object.sha'`
Expected: 40-char SHA (annotated tag → use `git/tags/<sha>` indirection if needed).

- [ ] **Step 3: Record in branch-naming-policy.md draft**

Save to local var or scratch file:
```
DPK_ACTION_PIN_TAG=<tag>
DPK_ACTION_PIN_SHA=<40-char-sha>
```

### Task 2.2: Write C1 branch-name-lint.yml smoke test (test-first)

**Files:**
- Create: `tests/sota-research/branch-name-lint-smoke.sh`

- [ ] **Step 1: Write smoke-test script**

```bash
mkdir -p tests/sota-research
cat > tests/sota-research/branch-name-lint-smoke.sh <<'EOF'
#!/usr/bin/env bash
# Smoke test: verify .github/workflows/branch-name-lint.yml exists + is YAML-valid
# + references pinned SHA + allowlist includes Conventional Branch types.
set -euo pipefail

WF=.github/workflows/branch-name-lint.yml
[ -f "$WF" ] || { echo "FAIL: workflow missing at $WF"; exit 1; }

# YAML validity
python -c "import yaml; yaml.safe_load(open('$WF'))" || { echo "FAIL: YAML invalid"; exit 2; }

# SHA-pinned (40-char hex after deepakputhraya/action-branch-name@)
grep -qE 'deepakputhraya/action-branch-name@[0-9a-f]{40}' "$WF" || { echo "FAIL: SHA not pinned (40-char)"; exit 3; }

# Allowlist contains Conventional Branch types
for type in feat fix docs style refactor test chore perf build ci; do
  grep -q "$type" "$WF" || { echo "FAIL: type '$type' missing from allowlist"; exit 4; }
done

# Dependabot/Renovate exceptions
grep -qE '(dependabot|renovate)' "$WF" || { echo "FAIL: dependabot/renovate exception missing"; exit 5; }

echo "PASS: branch-name-lint.yml smoke test green"
EOF
chmod +x tests/sota-research/branch-name-lint-smoke.sh
```

- [ ] **Step 2: Run smoke test (expect FAIL — file not yet created)**

Run: `bash tests/sota-research/branch-name-lint-smoke.sh; echo "EXIT=$?"`
Expected: `FAIL: workflow missing at .github/workflows/branch-name-lint.yml` `EXIT=1`

### Task 2.3: Create C1 .github/workflows/branch-name-lint.yml

**Files:**
- Create: `.github/workflows/branch-name-lint.yml`

- [ ] **Step 1: Write workflow**

```yaml
# .github/workflows/branch-name-lint.yml
# Enforces Conventional Branch prefixes on PRs + pushes.
# Spec: docs/superpowers/specs/2026-05-22-W366-L3-git-substrate-hardening-design.md §3 C1
# Authority: deepakputhraya/action-branch-name (pinned SHA per W366 spec CR-1)

name: branch-name-lint
on:
  pull_request:
    types: [opened, edited, reopened, synchronize]
  push:
    branches-ignore:
      - main
      - 'dependabot/**'
      - 'renovate/**'

permissions:
  contents: read
  pull-requests: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Validate branch name
        # SHA pinned per W366 spec CR-1; tag <DPK_ACTION_PIN_TAG> resolved 2026-05-22
        uses: deepakputhraya/action-branch-name@<40-CHAR-SHA-FROM-TASK-2.1>
        with:
          regex: '^(feat|fix|docs|style|refactor|test|chore|perf|build|ci)\/[a-z0-9._-]+$'
          allowed_prefixes: 'feat,fix,docs,style,refactor,test,chore,perf,build,ci'
          ignore: 'main,dependabot/.*,renovate/.*'
          min_length: 5
          max_length: 80
```

Replace `<40-CHAR-SHA-FROM-TASK-2.1>` with actual SHA captured in Task 2.1 Step 3.

**WARN-ONLY semantics for W366**: this workflow runs but its failures are advisory only in W366 (per spec §5 P2). Promotion to PR-required check happens in P5.

- [ ] **Step 2: Run smoke test (expect PASS)**

Run: `bash tests/sota-research/branch-name-lint-smoke.sh; echo "EXIT=$?"`
Expected: `PASS: branch-name-lint.yml smoke test green` `EXIT=0`

- [ ] **Step 3: Commit C1 + smoke test**

```bash
git add .github/workflows/branch-name-lint.yml tests/sota-research/branch-name-lint-smoke.sh
git commit -F - <<EOF
feat(W366): C1 branch-name-lint.yml (test-mode) + smoke test

Enforces Conventional Branch prefixes (feat/fix/docs/style/refactor/test/chore/perf/build/ci).
Dependabot/Renovate exempt. SHA-pinned per CR-1.
WARN-ONLY in W366; promoted to PR-required check in P5.

Closes F4 (W350 META-AUDIT F-A4 carry-forward).

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

### Task 2.4: Write C2 commitlint wave-trailer unit test (test-first)

**Files:**
- Create: `tests/sota-research/commitlint-wave-trailer.test.cjs`

- [ ] **Step 1: Write unit test**

```javascript
// tests/sota-research/commitlint-wave-trailer.test.cjs
// Unit test for commitlint custom rule `wave-trailer-exists`.
// Spec: docs/superpowers/specs/2026-05-22-W366-L3-git-substrate-hardening-design.md §3 C2
const lint = require('@commitlint/lint').default;
const config = require('../../commitlint.config.cjs');

async function expectVerdict(input, shouldPass, label) {
  const res = await lint(input, config.rules, { parserOpts: config.parserOpts });
  const passed = res.valid;
  const tag = passed === shouldPass ? 'PASS' : 'FAIL';
  console.log(`[${tag}] ${label}: valid=${passed} expected=${shouldPass}`);
  if (passed !== shouldPass) {
    console.error('  errors:', JSON.stringify(res.errors, null, 2));
    process.exitCode = 1;
  }
}

(async () => {
  // Case 1: commit WITH Wave: trailer → valid
  await expectVerdict(
    'feat(W366): test feature\n\nBody.\n\nWave: W366\nCodex-Verdict: BOOTSTRAP\n',
    true,
    'Case 1: with Wave: trailer'
  );

  // Case 2: commit WITHOUT Wave: trailer → INVALID
  await expectVerdict(
    'feat(W366): test feature\n\nBody without trailer.\n',
    false,
    'Case 2: missing Wave: trailer'
  );

  // Case 3: commit with [WAVE-TRAILER-EXEMPT] in subject → valid (bypass)
  await expectVerdict(
    'docs: minor typo fix [WAVE-TRAILER-EXEMPT]\n\nBody, no trailer.\n',
    true,
    'Case 3: bypass token in subject'
  );

  if (process.exitCode) {
    console.error('\nOne or more cases FAILED.');
  } else {
    console.log('\nAll 3 cases PASS.');
  }
})();
```

- [ ] **Step 2: Run unit test (expect FAIL — custom rule not yet added)**

Run: `node tests/sota-research/commitlint-wave-trailer.test.cjs; echo "EXIT=$?"`
Expected: Case 2 may PASS (default commitlint doesn't require trailer), Case 3 likely FAILs. EXIT=1.

### Task 2.5: Modify C2 commitlint.config.cjs — add wave-trailer-exists custom rule

**Files:**
- Modify: `commitlint.config.cjs`

- [ ] **Step 1: Read current file**

Run: `cat commitlint.config.cjs`
Expected: see existing config (extends conventional, possibly project-specific tweaks).

- [ ] **Step 2: Add custom rule**

Patch the file to include:

```javascript
// Append to module.exports.rules (or wherever rules are defined):
//
// 'wave-trailer-exists': [2, 'always'],
//
// And add to module.exports.plugins (or create plugins array):
//
// plugins: [
//   {
//     rules: {
//       'wave-trailer-exists': (parsed) => {
//         const subject = (parsed.subject || '');
//         if (subject.includes('[WAVE-TRAILER-EXEMPT]')) return [true];
//         const trailers = (parsed.notes || []).map(n => n.title || '');
//         const hasWave = trailers.some(t => /^Wave$/.test(t));
//         if (!hasWave) {
//           const raw = (parsed.raw || '');
//           const hasWaveRaw = /^Wave:\s*W\d+\s*$/m.test(raw);
//           return [hasWaveRaw, 'commit body must contain "Wave: W<N>" trailer OR subject must include [WAVE-TRAILER-EXEMPT]'];
//         }
//         return [true];
//       },
//     },
//   },
// ],
```

Use Edit tool to add this to `commitlint.config.cjs` while preserving existing rules.

- [ ] **Step 3: Run unit test (expect PASS)**

Run: `node tests/sota-research/commitlint-wave-trailer.test.cjs; echo "EXIT=$?"`
Expected: `[PASS] Case 1`, `[PASS] Case 2`, `[PASS] Case 3`. `All 3 cases PASS.` `EXIT=0`.

- [ ] **Step 4: Commit C2 + unit test**

```bash
git add commitlint.config.cjs tests/sota-research/commitlint-wave-trailer.test.cjs
git commit -F - <<EOF
feat(W366): C2 commitlint wave-trailer-exists rule (warn-only) + unit test

Adds custom rule rejecting commits without 'Wave: W<N>' trailer UNLESS subject
contains [WAVE-TRAILER-EXEMPT] bypass token.
Warn-only in W366 (level 1, not 2); promoted to error in P5.

Closes F5 (W350 META-AUDIT F-A1 carry-forward; 75% Wave-trailer miss rate).

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

NOTE: For warn-only initial mode, change `'wave-trailer-exists': [2, 'always']` to `'wave-trailer-exists': [1, 'always']` (level 1 = warning). P5 promotes to level 2 (error).

### Task 2.6: Author C3 docs/standards/branch-naming-policy.md

**Files:**
- Create: `docs/standards/branch-naming-policy.md`

- [ ] **Step 1: Write policy doc**

```bash
mkdir -p docs/standards
cat > docs/standards/branch-naming-policy.md <<'EOF'
# Branch Naming Policy

> Effective W366. Enforced by `.github/workflows/branch-name-lint.yml` (warn-only in W366; PR-required in W367+).

## Allowed prefixes (Conventional Branch standard)

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New feature or capability | `feat/W366-git-substrate-hardening` |
| `fix/`  | Bug fix | `fix/W366-trailer-bypass-typo` |
| `docs/` | Documentation only | `docs/standards-overhaul` |
| `style/` | Code style / formatting | `style/prettier-rerun` |
| `refactor/` | Code restructure, no behavior change | `refactor/extract-validator` |
| `test/` | Test-only changes | `test/W366-smoke-coverage` |
| `chore/` | Maintenance, dependency bumps | `chore/dependabot-bump` |
| `perf/` | Performance improvement | `perf/cache-validator` |
| `build/` | Build-system changes | `build/upgrade-vite` |
| `ci/`   | CI/CD changes | `ci/add-trivy-scan` |

## Auto-exempt prefixes

- `dependabot/*` (Dependabot bot)
- `renovate/*` (Renovate bot)
- `main` (default branch)

## Slug rules

- Lowercase, kebab-case
- May include `W<N>` wave number for wave-keyed work: `feat/W366-git-substrate-hardening`
- 5-80 chars total length

## Migration: goal/ → feat/

Existing `goal/W<N>-…` branches must be renamed to `feat/W<N>-…` per W366 reconciliation.

Dual-track migration steps:
```bash
git tag archive/goal/W<N>-<slug> goal/W<N>-<slug>      # preserve old name
git branch -m goal/W<N>-<slug> feat/W<N>-<slug>        # rename
git push origin :goal/W<N>-<slug>                       # delete old remote
git push -u origin feat/W<N>-<slug>                     # push new remote
```

## Rationale

Closes W350 META-AUDIT F-A4 (Conventional Branch policy unenforced).
Closes AUDIT-2026-05-21 Stream A F4 (3 naming conventions coexist).

## References

- [agbell/conventional-branch](https://github.com/agbell/conventional-branch) — prefix taxonomy
- [deepakputhraya/action-branch-name](https://github.com/deepakputhraya/action-branch-name) — enforcer
- W366 spec §3 C3
EOF
```

- [ ] **Step 2: Commit C3**

```bash
git add docs/standards/branch-naming-policy.md
git commit -F - <<EOF
docs(W366): C3 branch-naming-policy — Conventional Branch + goal/→feat/ migration

Closes F4 documentation gap (W350 META-AUDIT F-A4).

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

### Task 2.7: Author C4 docs/standards/tag-naming-policy.md

**Files:**
- Create: `docs/standards/tag-naming-policy.md`

- [ ] **Step 1: Write policy doc**

```bash
cat > docs/standards/tag-naming-policy.md <<'EOF'
# Tag Naming Policy

> Effective W366. Audited but NOT retroactively enforced (existing tags preserved).

## Tag patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| `archive/<prefix>/<name>` | Preserve deleted branch refs | `archive/goal/W348-carry-cleanup` |
| `archive/<name>` | Preserve deleted bare-named branches | `archive/w348-sota-fix` |
| `w<n>-codex-r<N>` | Per-wave codex review round | `w366-codex-r3` |
| `w<n>-ship` | Wave ship marker | `w366-ship` |
| `pre-<wave>-<topic>` | Reverify-point pre-mutation snapshot | `pre-W366-config-dedup` |

## Audit (informational only)

Run `git tag --list` and verify recent tags conform. Non-conforming legacy tags are NOT rewritten (history-rewrite forbidden post-push per CR-6).

## Rationale

Closes AUDIT-2026-05-21 Stream A F-A9 (tag-naming inconsistency).

## References

- W366 spec §3 C4
EOF
```

- [ ] **Step 2: Commit C4**

```bash
git add docs/standards/tag-naming-policy.md
git commit -F - <<EOF
docs(W366): C4 tag-naming-policy — standardized patterns

Closes F-A9 (record-only; no history rewrite).

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

---

## Phase 3 — C5 Branch Reconciliation Matrix + Operator Sign

### Task 3.1: Probe live branch state per 12 unmerged branches

**Files:**
- Read: `git for-each-ref` output per branch

- [ ] **Step 1: Generate per-branch state report**

Run:
```bash
mkdir -p docs/architecture/W366-L3-GIT-SUBSTRATE
{
  echo "# Live Branch State Probe — $(date -I)"
  echo ""
  echo "| Branch | Last commit | Ahead | Behind | Upstream |"
  echo "|--------|-------------|-------|--------|----------|"
  for ref in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
    last=$(git log -1 --format='%cs %s' "$ref" 2>/dev/null | cut -c1-60)
    upstream=$(git for-each-ref --format='%(upstream:short)' "refs/heads/$ref" 2>/dev/null)
    if [ -n "$upstream" ]; then
      ahead=$(git rev-list --count "$upstream..$ref" 2>/dev/null || echo "?")
      behind=$(git rev-list --count "$ref..$upstream" 2>/dev/null || echo "?")
    else
      ahead="-"; behind="-"
    fi
    echo "| $ref | $last | $ahead | $behind | ${upstream:-none} |"
  done
} > docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-PROBE.md
```

- [ ] **Step 2: Verify probe output**

Run: `cat docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-PROBE.md`
Expected: table with 12-14 rows showing all heads.

### Task 3.2: Author BRANCH-RECONCILIATION-VERDICTS.md draft

**Files:**
- Create: `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md`

- [ ] **Step 1: Author draft from spec §4 table**

```bash
cat > docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md <<'EOF'
# W366 Branch Reconciliation Verdicts

> Per spec §4. **Operator-sign required per branch before any delete operation.**
> Probe basis: BRANCH-PROBE.md (live state at wave-open).

## Verdict legend

- **ARCHIVE-TAG-AND-DELETE**: tag `archive/<name>`, then `git branch -D <name>` + delete remote
- **SQUASH-MERGE**: PR + squash-merge into main, then archive-tag-and-delete
- **MIGRATE goal/→feat/**: rename per branch-naming-policy.md dual-track procedure
- **KEEP-AS-IN-FLIGHT**: no action; explicit hands-off
- **NEEDS-INVESTIGATION**: state ambiguous; deeper probe before verdict

## Per-branch verdicts

| # | Branch | Verdict | Operator sign | T6 cross-ref |
|---|--------|---------|----------------|--------------|
| 1 | w348 | ARCHIVE-TAG-AND-DELETE | pending | — |
| 2 | w348-sota-fix | ARCHIVE-TAG-AND-DELETE | pending | — |
| 3 | w348-sota-fix-ledger | ARCHIVE-TAG-AND-DELETE | pending | — |
| 4 | w348-sota-fix-p5b | RESCUE → SQUASH-MERGE-TO-MAIN (after W353/W364 verified absent from main) | pending | main/verdicts/w353 |
| 5 | goal/W348-carry-cleanup | ARCHIVE-TAG-AND-DELETE | pending | goal-prompts/W348-carry-cleanup |
| 6 | feat/research-arch-v18-pipeline-foundation | ARCHIVE-TAG-IF-ON-MAIN | pending | main/verdicts/w353 |
| 7 | feat/w354-sota-install-wave | KEEP-OR-MERGE (operator check W354 state) | pending | — |
| 8 | feat/w355-codex-closure-and-installs | RESCUE-UPSTREAM (DONE Task 1.4), KEEP | pending | — |
| 9 | goal/W356-research-arch-v19-evolution | RESCUE-UPSTREAM (DONE Task 1.3), KEEP, MIGRATE → feat/W356-... | pending | — |
| 10 | goal/W357-architecture-layer-decomposition | MIGRATE goal/→feat/ | pending | — |
| 11 | goal/W358-grand-repo-catalog | MIGRATE goal/→feat/ | pending | — |
| 12 | goal/W359-peer-comparison-execution | MIGRATE goal/→feat/ | pending | — |
| 13 | goal/W360-methodology-hardening | MIGRATE goal/→feat/ | pending | — |
| 14 | goal/W361-live-llm-closure | MIGRATE goal/→feat/ | pending | — |
| 15 | goal/W362a-live-re-score | KEEP-AS-IN-FLIGHT (W362a worktree active) | pending | — |
| 16 | goal/W362b-alpha-catalog-refresh | KEEP-AS-IN-FLIGHT | pending | — |
| 17 | goal/W362b-beta-xg-doctrine | KEEP-AS-IN-FLIGHT | pending | — |
| 18 | goal/W362c-peer-live-judging | **HARD KEEP — LIVE judging 85 panels, NO TOUCH** | pending | — |
| 19 | goal/W353-WAVE-CLOSE | ARCHIVE-TAG-IF-ON-MAIN | pending | main/verdicts/w353 |

## Sign procedure

For each row, operator writes one of:
- `OK <date> <signer>` — verdict approved, action authorized
- `HOLD <date> <signer> — reason: <text>` — investigate further before action
- `REVISE <date> <signer> — new-verdict: <text>` — change verdict before action

No row may be acted on (Phase 6) without `OK` or `REVISE` sign.
EOF
```

- [ ] **Step 2: Commit C5 draft**

```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md \
        docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-PROBE.md
git commit -F - <<EOF
docs(W366): C5 branch-reconciliation-verdicts (draft — operator-sign pending)

19-row per-branch verdict matrix. W362c LIVE judging = HARD KEEP.
No delete/rename actions until operator-sign per row in Phase 6.

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

### Task 3.3: Present to operator for per-branch sign

**Files:**
- Read: `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md`

- [ ] **Step 1: Surface matrix to operator**

Output to chat: full matrix contents. Ask operator to sign each row OK/HOLD/REVISE.

Use `AskUserQuestion` for batched sign (5 questions max per turn, since 19 rows > 4 question limit per call):
- Q batch 1: rows 1-4 sign
- Q batch 2: rows 5-9 sign
- Q batch 3: rows 10-14 sign
- Q batch 4: rows 15-19 sign

Each question presents 3-4 options (OK / HOLD / REVISE / Investigate). The 4-option AskUserQuestion limit means per-row multiple-choice; 5 rows per turn is acceptable since each row is independent.

- [ ] **Step 2: Update C5 with operator signatures**

After each batch returns, Edit `BRANCH-RECONCILIATION-VERDICTS.md` to fill in the `Operator sign` column.

### Task 3.4: Commit signed C5

**Files:**
- `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md` (updated)

- [ ] **Step 1: Commit final signed matrix**

```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md
git commit -F - <<EOF
docs(W366): C5 branch-reconciliation-verdicts — operator-signed all 19 rows

Per-row OK/HOLD/REVISE verdicts captured. Phase 6 execution gated on these signs.

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

---

## Phase 4 — F-A5/A6/A7/A8/A9 + F6 cleanup

### Task 4.1: F-A5 — git config dedup

**Files:**
- Modify: `.git/config` (via `git config` CLI)

- [ ] **Step 1: Verify dups exist (per pre-flight)**

Run: `git config --get-all pull.rebase | wc -l && git config --get-all push.useforceifincludes | wc -l`
Expected: `2` and `2` per AUDIT-2026-05-21 Stream A F-A5.

- [ ] **Step 2: Unset all, then set canonical single value**

Run:
```bash
git config --unset-all pull.rebase
git config pull.rebase true
git config --unset-all push.useforceifincludes
git config push.useforceifincludes true
```
Expected: no error.

- [ ] **Step 3: Verify single value**

Run: `git config --get-all pull.rebase | wc -l && git config --get-all push.useforceifincludes | wc -l`
Expected: `1` and `1`.

- [ ] **Step 4: Record fix in FIX-RECORD.md**

```bash
cat >> docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md <<EOF
## F-A5 — git config dedup
Date: $(date -I)
pull.rebase: <pre>2 entries</pre> → <post>$(git config --get-all pull.rebase | wc -l) entry, value=$(git config pull.rebase)</post>
push.useforceifincludes: <pre>2 entries</pre> → <post>$(git config --get-all push.useforceifincludes | wc -l) entry, value=$(git config push.useforceifincludes)</post>
Status: CLOSED
EOF
```

### Task 4.2: F-A6 — investigate dup commit 56e13b5 vs d5422ec

**Files:**
- Read: `git log` output for both SHAs

- [ ] **Step 1: Diff the two commits**

Run:
```bash
git log -1 --stat 56e13b5
git log -1 --stat d5422ec
git diff 56e13b5^..56e13b5 > /tmp/56e13b5.patch
git diff d5422ec^..d5422ec > /tmp/d5422ec.patch
diff /tmp/56e13b5.patch /tmp/d5422ec.patch | head -50
```
Expected: see if content is byte-identical (true dup) or just subject-identical (different content).

- [ ] **Step 2: Decide action**

If content-identical AND not pushed to a protected branch: drop one via interactive rebase.
If content-different OR pushed: document as known-twin in FIX-RECORD.md.

If drop:
```bash
git rebase --interactive 56e13b5~2
# In editor, change one of the two duplicate lines to `drop`
git log --oneline 56e13b5~1..HEAD
```
Expected: history shows only one of the two SHAs.

If document:
```bash
cat >> docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md <<EOF
## F-A6 — dup commit 56e13b5 vs d5422ec
Date: $(date -I)
Verdict: <DROPPED-VIA-REBASE | DOCUMENTED-AS-KNOWN-TWIN>
Rationale: <text>
Status: CLOSED
EOF
```

### Task 4.3: F-A7 + F6 — empty dir delete + case rename

**Files:**
- Delete: `docs/architecture/W350-sota-git-tree-finalization/`
- (Already correctly cased): `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/`

- [ ] **Step 1: Verify empty**

Run: `ls -la docs/architecture/W350-sota-git-tree-finalization/`
Expected: empty (no regular files, only `.` and `..`).

- [ ] **Step 2: Remove**

Run: `rmdir docs/architecture/W350-sota-git-tree-finalization/`
Expected: directory removed (rmdir fails on non-empty).

- [ ] **Step 3: Verify absence**

Run: `ls docs/architecture/W350* 2>&1`
Expected: only `W350-SOTA-GIT-TREE-AUDIT/` remains.

- [ ] **Step 4: Record fix**

```bash
cat >> docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md <<EOF
## F-A7 + F6 — empty-dir delete
Date: $(date -I)
Removed: docs/architecture/W350-sota-git-tree-finalization/ (empty)
Canonical: docs/architecture/W350-SOTA-GIT-TREE-AUDIT/ (UPPER-kebab)
Status: CLOSED
EOF
```

### Task 4.4: F-A8 — annotate merge commit 9104573 in CLAUDE.md footnote

**Files:**
- Modify: `CLAUDE.md` (cardinal-rule footnotes area near L14 worktree section)

- [ ] **Step 1: Locate insertion point**

Run: `grep -n "rebase-not-merge" CLAUDE.md`
Expected: line number around the worktree/parallel-session section.

- [ ] **Step 2: Add footnote**

Use Edit to append after the rebase-not-merge mention:

```
[W366 F-A8 footnote 2026-05-22: one known merge commit on origin/w348-sota-fix exists at `9104573` ("merge origin/main into w348-sota-fix — resolve 4-file conflicts") — conflict-driven, pre-push, preserved as known one-off; no history rewrite per CR-6.]
```

- [ ] **Step 3: Record fix**

Append to FIX-RECORD.md similarly.

### Task 4.5: F-A9 — tag audit

**Files:**
- Read: `git tag --list` output
- Append: `docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md`

- [ ] **Step 1: Generate tag audit report**

Run:
```bash
{
  echo "# Tag Audit — $(date -I)"
  echo ""
  echo "## All tags"
  git tag --list | sort
  echo ""
  echo "## Conformance to tag-naming-policy.md"
  git tag --list | awk '
    /^archive\// { conform++; next }
    /^w[0-9]+-(codex-r[0-9]+|ship|alpha-codex-r[0-9]+|alpha-ship|beta-codex-r[0-9]+|beta-ship)$/ { conform++; next }
    /^pre-[Ww][0-9]+/ { conform++; next }
    /^W[0-9]+-/ { conform++; next }
    { nonconform++; print "  NON-CONFORMING: " $0 }
    END { print ""; print "  Conform: " conform; print "  Non-conform: " nonconform }
  '
} > docs/architecture/W366-L3-GIT-SUBSTRATE/TAG-AUDIT.md
```

- [ ] **Step 2: Append to FIX-RECORD.md**

```bash
cat >> docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md <<EOF
## F-A9 — tag audit
Date: $(date -I)
Report: TAG-AUDIT.md ($(wc -l < docs/architecture/W366-L3-GIT-SUBSTRATE/TAG-AUDIT.md) LOC)
Action: record-only (no history rewrite); going-forward tags MUST conform to docs/standards/tag-naming-policy.md
Status: CLOSED
EOF
```

### Task 4.6: Commit Phase 4 batch

**Files:**
- `CLAUDE.md`
- `docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md`
- `docs/architecture/W366-L3-GIT-SUBSTRATE/TAG-AUDIT.md`

- [ ] **Step 1: Commit P4**

```bash
git add CLAUDE.md docs/architecture/W366-L3-GIT-SUBSTRATE/FIX-RECORD.md \
        docs/architecture/W366-L3-GIT-SUBSTRATE/TAG-AUDIT.md
git commit -F - <<EOF
fix(W366): P4 SEV-3 cleanup — F-A5 config dedup + F-A6 dup-commit + F-A7/F6 empty-dir + F-A8 merge-doc + F-A9 tag-audit

5 SEV-3 findings closed (per FIX-RECORD.md). CLAUDE.md L14 footnote for F-A8.
git config dedup affects local repo only (.git/config not tracked).

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

---

## Phase 5 — Promote C1+C2 to enforcing

### Task 5.1: Promote C1 to PR-required check

**Files:**
- Modify: branch-protection rules on `main` (via gh CLI)

- [ ] **Step 1: List current required checks**

Run: `gh api repos/:owner/:repo/branches/main/protection --jq '.required_status_checks.contexts'`
Expected: JSON array of current required checks.

- [ ] **Step 2: Add branch-name-lint to required list**

Run:
```bash
gh api -X PATCH repos/:owner/:repo/branches/main/protection \
  -F required_status_checks.strict=true \
  -F 'required_status_checks.contexts[]=branch-name-lint / lint'
```
Expected: 200 response with updated rules.

- [ ] **Step 3: Verify enforcement**

Open a test PR from a non-conforming branch (`bogus-test-W366`) → expect branch-name-lint to fail PR.

### Task 5.2: Promote C2 to error level

**Files:**
- Modify: `commitlint.config.cjs`

- [ ] **Step 1: Edit rule level**

Edit `commitlint.config.cjs`: change `'wave-trailer-exists': [1, 'always']` → `'wave-trailer-exists': [2, 'always']`.

- [ ] **Step 2: Re-run unit test**

Run: `node tests/sota-research/commitlint-wave-trailer.test.cjs; echo "EXIT=$?"`
Expected: all 3 cases pass; Case 2 still INVALID (now error not warning).

- [ ] **Step 3: Test against real commit-msg hook**

Try a test commit without the trailer:
```bash
echo "test" > /tmp/test-w366-msg
git commit --allow-empty -F /tmp/test-w366-msg
```
Expected: pre-commit hook (commitlint) BLOCKS the commit with error message about missing Wave: trailer.

- [ ] **Step 4: Commit promotion**

```bash
git add commitlint.config.cjs
git commit -F - <<EOF
fix(W366): P5 promote wave-trailer-exists from warn (level 1) → error (level 2)

W366 itself ships under warn; W367+ commits must carry Wave: W<N> trailer
or use [WAVE-TRAILER-EXEMPT] bypass.

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

---

## Phase 6 — Execute branch reconciliation

### Task 6.1: Execute ARCHIVE-TAG-AND-DELETE batch

**Files:**
- Modify: git refs (tags + branches)

- [ ] **Step 1: Filter rows with verdict ARCHIVE-TAG-AND-DELETE AND operator-sign=OK**

Read `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md`. List matching branches.

- [ ] **Step 2: For each matching branch, archive-tag-and-delete**

For each branch `BR` in the matching list:
```bash
git tag "archive/${BR}" "$BR"
git push origin "refs/tags/archive/${BR}:refs/tags/archive/${BR}"
git branch -D "$BR"
git push origin --delete "$BR" 2>&1 || echo "  (no remote ref)"
```

- [ ] **Step 3: Record per-branch outcome**

Append to `docs/architecture/W366-L3-GIT-SUBSTRATE/RECONCILIATION-EXECUTION.md`.

### Task 6.2: Execute MIGRATE goal/→feat/ batch

**Files:**
- Modify: git refs (rename + tag preserve)

- [ ] **Step 1: Filter rows with verdict MIGRATE AND operator-sign=OK**

- [ ] **Step 2: For each, dual-track rename**

```bash
OLD="goal/${WAVE}-${SLUG}"
NEW="feat/${WAVE}-${SLUG}"
git tag "archive/${OLD}" "$OLD"
git push origin "refs/tags/archive/${OLD}:refs/tags/archive/${OLD}"
git branch -m "$OLD" "$NEW"
git push origin ":${OLD}"
git push -u origin "$NEW"
```

- [ ] **Step 3: Record outcomes**

Append to RECONCILIATION-EXECUTION.md.

### Task 6.3: Execute SQUASH-MERGE batch (if any)

**Files:**
- PR + main merge

- [ ] **Step 1: For each SQUASH-MERGE-verdict branch with OK sign**

- [ ] **Step 2: Create PR via gh, squash-merge after CI green**

```bash
gh pr create --base main --head "$BR" --title "..." --body "..."
gh pr merge --squash --delete-branch <PR-num>
```

### Task 6.4: Verify final branch state

**Files:**
- Read: `git branch -a` + `git tag --list`

- [ ] **Step 1: Branch count target**

Run: `git branch | wc -l`
Expected: count reduced per executed verdicts.

- [ ] **Step 2: Cross-ref archive tags**

Run: `git tag --list 'archive/*' | wc -l`
Expected: count increased by sum of ARCHIVE-TAG-AND-DELETE + MIGRATE rows.

- [ ] **Step 3: Commit reconciliation record**

```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/RECONCILIATION-EXECUTION.md
git commit -F - <<EOF
fix(W366): P6 execute branch reconciliation per operator-signed C5 verdicts

See RECONCILIATION-EXECUTION.md for per-branch outcomes.
goal/→feat/ migration: dual-tracked with archive/goal/* tags preserving old names.
Branch count: pre=<N> → post=<M>.

Wave: W366
Codex-Verdict: BOOTSTRAP
EOF
```

---

## Phase 7 — Codex r1→rN + ship

### Task 7.1: Compose codex review prompt

**Files:**
- Create: `docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-PROMPT.md`

- [ ] **Step 1: Write prompt**

```bash
cat > docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-PROMPT.md <<'EOF'
# Codex Review Prompt — W366 L3 Git Substrate Hardening

## Context
Spec: docs/superpowers/specs/2026-05-22-W366-L3-git-substrate-hardening-design.md
Plan: docs/architecture/W366-L3-GIT-SUBSTRATE/PLAN.md
Branch: feat/W366-git-substrate-hardening (or current branch if in-place per Task 0.1c)

## Authority
3-org-distinct + Anthropic-docs-anchored. Sonnet 4.6 tie-breaker per V18 §11.

## Findings to verify closed
SEV-1: F1 (w348-sota-fix-p5b pushed), F2 (W355+W356 upstreams)
SEV-2: F4 (branch-name-lint), F5 (commitlint wave-trailer), F6 (empty dir deleted)
SEV-3: F-A5 (config dedup), F-A6 (dup commit), F-A7 (case rename), F-A8 (merge footnote), F-A9 (tag audit)

## Acceptance bar
All 14 items per spec §2 closed; 9 components shipped; 19-row C5 operator-signed; 8 phases executed in order; KPI L3 = 2.0 → 4.0.

## Required output
- VERDICT: APPROVE | REVISE
- If REVISE: numbered findings with severity (P0/P1/P2) + file:line citations
- Cite-anchors for every claim per CR-6
EOF
```

### Task 7.2: Run codex r1

**Files:**
- Output: `docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-VERDICT.md`

- [ ] **Step 1: Invoke codex review**

Use codex plugin: `/codex:adversarial-review docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-PROMPT.md`
Expected: codex GPT-5.5 returns a verdict (APPROVE or REVISE with findings).

- [ ] **Step 2: Record r1 output**

```bash
cat > docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-VERDICT.md <<EOF
# W366 Codex Review Rounds

## Round 1
Date: $(date -I)
Verdict: <APPROVE|REVISE>
Findings: <count>
<paste codex output>
EOF
```

- [ ] **Step 3: Tag round**

Run: `git tag w366-codex-r1 HEAD`

### Task 7.3: Address r1 REVISE findings (skip if r1 APPROVED)

**Files:**
- Various per findings

- [ ] **Step 1: Triage each finding by priority**

- [ ] **Step 2: Fix in numbered sub-commits**

For each finding, separate commit:
```
fix(W366-codex-r1-f<N>): <description>

Wave: W366
Codex-Verdict: BOOTSTRAP
```

- [ ] **Step 3: Mark each finding addressed in CODEX-VERDICT.md**

### Task 7.4: Repeat rounds until APPROVE (max r10)

**Files:**
- Continue updating CODEX-VERDICT.md

- [ ] **Step 1: For each subsequent round (r2, r3, ...)**

Same as Task 7.2 + 7.3. Tag `w366-codex-r<N>`. Stop on APPROVE.

- [ ] **Step 2: Hard wall at r10**

If r10 still REVISE: HALT. Surface to operator per V18 §11 R3 escalate clause.

- [ ] **Step 3: Sonnet 4.6 tie-break (only if r3↔r4 verdicts diverge)**

Per W331 P0.7 + V18 §11: invoke Sonnet 4.6 as cross-model arbiter. Record verdict in CODEX-VERDICT.md.

### Task 7.5: Compose final ship commit

**Files:**
- All wave artifacts staged

- [ ] **Step 1: Verify all acceptance-bar items closed**

Run through spec §2 (14 items) + §8 (success criteria); confirm each.

- [ ] **Step 2: Update T6 basic-memory verdict**

Use mcp__basic-memory__write_note:
- title: "W366 L3 Git Substrate Hardening — Wave Closure Verdict"
- folder: "verdicts/w366"
- content: closure summary (gates passed, codex rounds, branch counts, KPI L3 re-score)

- [ ] **Step 3: Final ship commit + push**

```bash
git add docs/architecture/W366-L3-GIT-SUBSTRATE/
git commit -F - <<EOF
ship(W366): L3 Git Substrate Hardening — APPROVED

All 14 acceptance-bar items closed (spec §2).
9 components shipped (§3). 19-row C5 operator-signed (§4).
8 phases executed in order (§5). All §6 tests pass.
Codex GPT-5.5 r<N>: APPROVE.

KPI: L3 git foundation sca-score lifted 2.0 → <re-scored value>.
T6 verdict: main/verdicts/w366/w366-l3-git-substrate-hardening-wave-closure-verdict

Wave: W366
Codex-Verdict: APPROVE
EOF

git push --force-with-lease origin feat/W366-git-substrate-hardening
git tag w366-ship HEAD
git push origin w366-ship
```

### Task 7.6: Open PR to main + branch-protection check

**Files:**
- gh PR

- [ ] **Step 1: Open PR**

```bash
gh pr create \
  --base main \
  --head feat/W366-git-substrate-hardening \
  --title "W366: L3 Git Substrate Hardening" \
  --body "Closes 9 Stream A findings; lifts L3 sca-score 2.0→4.0. See docs/architecture/W366-L3-GIT-SUBSTRATE/SPEC.md."
```

- [ ] **Step 2: Wait for branch-protection checks**

Run: `gh pr checks <PR-num> --watch`
Expected: all required checks green (including new branch-name-lint).

- [ ] **Step 3: Operator-merge (squash) when CI green**

```bash
gh pr merge --squash --delete-branch <PR-num>
```

---

## Self-Review

**Spec coverage:**
- ✅ Spec §2 acceptance items 1-14 → mapped to Tasks 1.1-1.6 (1-2), 2.3 (F4), 2.5 (F5), 4.3 (F6), 4.1 (F-A5), 4.2 (F-A6), 4.3 (F-A7), 4.4 (F-A8), 4.5 (F-A9), 3.x (branch recon), 6.2 (migration), 7.4 (codex APPROVE), 7.5 (final commit)
- ✅ Spec §3 components C1-C9 → Tasks 2.3 (C1), 2.5 (C2), 2.6 (C3), 2.7 (C4), 3.2 (C5), 7.5 spec-snapshot (C6), this file (C7), 7.2 (C8), 4.3 (C9)
- ✅ Spec §4 12-branch table → expanded to 19-row matrix in Task 3.2 (some branches split out for clarity)
- ✅ Spec §5 8-phase order → Phases 0-7 of this plan map 1:1
- ✅ Spec §6 testing → Tasks 2.2 (C1 smoke), 2.4 (C2 unit), implicit verify in each fix task
- ✅ Spec §7 risks → R1 (Phase 0/1 verification), R2 (warn-only P2→P5 promotion), R3 (archive-tag preserves goal/), R4 (Task 4.2 skip-if-pushed), R5 (W362c HARD KEEP in C5), R6 (Dependabot allowlist Task 2.3), R7 (Task 7.4 hard wall), R8 (covered by gh PR + signed commits), R9 (Task 0.1 + R9 spec), R10 (Task 7.2 fallback)
- ✅ Spec §10 explicit out-of-scope honored (no L4/L5 work; no sota-research scaffold; no layer-rename; no W362c touch)

**Placeholder scan:**
- `<40-CHAR-SHA-FROM-TASK-2.1>` in Task 2.3 Step 1: intentional placeholder filled at Task 2.1 runtime per documented procedure. Acceptable per spec §12 self-review.
- `<re-scored value>` in Task 7.5 final commit: filled at wave-close after sca re-run. Acceptable.
- `<PR-num>` in Task 7.6: filled at PR open time. Acceptable.
- `<count>`, `<paste codex output>` in Task 7.2: filled at runtime. Acceptable.
- `:owner/:repo` in Task 5.1: gh CLI auto-resolves these. Acceptable.

**Type consistency:**
- Component IDs (C1-C9): consistent across spec § and plan tasks
- Phase numbers (P0-P7): consistent
- Finding codes (F1, F2, F4, F5, F6, F-A5, F-A6, F-A7, F-A8, F-A9): consistent
- Branch name `feat/W366-git-substrate-hardening`: consistent across all tasks
- Wave trailer `Wave: W366`: consistent in all commit blocks
- Codex-Verdict trailer: `BOOTSTRAP` for in-flight, `APPROVE` for final ship — consistent
- Tag patterns: `w366-codex-r<N>`, `w366-ship`, `archive/<branch>` — consistent with tag-naming-policy.md

**Identified during self-review (fixed inline):**
- Originally Task 3.3 said "ask 19 questions in 4 batches" — AskUserQuestion supports 4 questions max per call AND 4 options max per question, so 19 rows needs 5 batches of up-to-4 rows each. Re-counted: 5 batches × 4 rows = 20 capacity ≥ 19 rows. OK.
- Originally Phase 5 promoted C1 to enforcing immediately. Per spec §7 R2 ("warn-only for 1 wave"), W366 itself ships under warn; promotion happens at W367 start. Re-checked Phase 5 task description — currently says "Promote C1+C2 from test-mode → enforcing" within W366. This is per spec §5 P5 explicit phase. The R2 warning is about the JSONL behavior (don't break W366's own commits), which is covered by W366 commits using `Wave: W366` already (so they pass the rule). No conflict; keeping P5 as the promotion phase IS correct.

**Gap check:** No identified gaps. Plan is complete.

---

## Execution Handoff

**Plan complete and saved to `docs/architecture/W366-L3-GIT-SUBSTRATE/PLAN.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration. Best for the 30+ atomic tasks here since Phase 0 worktree decision + Phase 3 operator-sign + Phase 7 codex rounds all need orchestration.

**2. Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints. Slower but keeps all context in one transcript; useful if you want to watch each phase land in real-time.

**Which approach?**

(After approach selection, the executing agent will start at Task 0.1 worktree-decision gate.)

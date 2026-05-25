# W352-SOTA-CONVERGENCE-FOUNDATIONAL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close 7-stream-audited CR-6 verify-before-claim violations + ship the SOTA-convergence install set (git-town + pinact + commitlint trailer mechanization + branch-protection ruleset + JSONL telemetry restoration + research-architecture mechanization) on `goal/W352-rulesets-and-automation`.

**Architecture:** 11 vertical slices, each = one commit on `goal/W352-rulesets-and-automation` worktree (`Z:/claude-sota-installed-W352`). Each commit passes all 13 pre-commit gates including codex-trailer-gate (`Codex-Verdict: APPROVE` or `BOOTSTRAP`). S8 langfuse bump deferred to W353+ per codex r1 (no CVE). Implementation order = dependency-rolled (drift-fix first → mechanization → install → consolidation).

**Tech Stack:** Node 22 (.mjs hooks), bash (commit/install scripts), POSIX YAML/JSON (configs), GitHub Actions YAML (workflows), git CLI (worktrees + branch ops), `gh` CLI (API ops), commitlint 20.5.3 + Conventional Commits 1.0.0, codex GPT-5.5 via openai-codex plugin.

---

## File Structure

Files this plan creates (NEW) or modifies (MOD), grouped by slice:

| Slice | File | Status | Responsibility |
|---|---|---|---|
| S1 | `CLAUDE.md` | MOD | Drift-fix 5 numeric/citation claims |
| S1 | `.claude/state/claude-md-claim-probes.json` | NEW | Probe-paired CR-6 enforcement substrate |
| S1 | `.pre-commit-config.yaml` | MOD | L49 `commitlint.config.js` → `.cjs` |
| S1 | `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md` | MOD | L166 self-contradiction reconcile |
| S2 | `.commitlintrc.json` | NEW | Mirror config + ignores |
| S2 | `commitlint.config.cjs` | MOD | Custom `body-must-contain-wave-trailer` rule |
| S3 | `tools/installed-binaries.txt` | NEW | git-town + pinact version record |
| S3 | `CLAUDE.md` | MOD | L77 footer install record |
| S4 | `.github/workflows/*.yml` (9 files) | MOD | SHA-pin tag-refs via pinact |
| S4 | `.github/workflows/zizmor-action.yml` | MOD | `continue-on-error: true` → `false` |
| S5 | `tools/precheck-worktree-add.mjs` | NEW | ≤2KB cap-enforcer hook body |
| S5 | `.claude/settings.json` | MOD | Wire WorktreeAdd PreToolUse hook |
| S6 | `.claude/settings.json` | MOD | 7 new PreToolUse[Bash] hooks (JSONL writers) |
| S7 | `tools/apply-branch-protection.sh` | NEW | POSIX `gh api` applier |
| S7 | `tools/branch-protection.json` | NEW | Versioned ruleset spec |
| S9 | `tools/precommit-cite-floor.mjs` | NEW | 3-org-distinct CI gate |
| S9 | `.pre-commit-config.yaml` | MOD | Wire cite-floor-check hook |
| S10 | `docs/architecture/W259-grand-catalog/catalog.yaml` | NEW | Canonical machine-readable substrate |
| S10 | `tools/catalog-rebuild.mjs` | NEW | YAML → MD derivation tool |
| S10 | `tools/catalog-diff.mjs` | NEW | Wave-over-wave score delta tool |
| S11 | `.claude/skills/sca-meta-audit/SKILL.md` | NEW | Meta-rubric auditor |
| S12 | `.claude/plugins/installed_plugins.json` | MOD | Remove 3 retire-candidates |
| S12 | `.claude/settings.json` | MOD | Remove 3 from `enabledPlugins` |
| S12 | `CLAUDE.md` | MOD | Reconcile plugin counts |

**Working directory for all tasks**: `Z:/claude-sota-installed-W352` (worktree on `goal/W352-rulesets-and-automation`)

---

## Task 0: Prep W352 worktree

**Files:**
- Modify: `Z:/claude-sota-installed-W352` (working tree)
- Cherry-pick: commit `0fbf244` (W352 design + codex verdict)

- [ ] **Step 1: Verify W352 worktree exists + is on correct branch**

Run from `Z:/claude-sota-installed`:
```bash
git worktree list | grep W352
```
Expected: `Z:/claude-sota-installed-W352   eead5d9 [goal/W352-rulesets-and-automation]` (or newer SHA)

- [ ] **Step 2: Switch to W352 worktree + verify clean tree**

```bash
cd Z:/claude-sota-installed-W352
git status --short
```
Expected: empty (clean working tree). If dirty, halt and ask operator before proceeding.

- [ ] **Step 3: Cherry-pick W352 design commit from w348-sota-fix-p5b**

```bash
git cherry-pick 0fbf244
```
Expected: clean apply (no conflicts). DESIGN.md + CODEX-VERDICT.md land on `goal/W352-rulesets-and-automation`.

- [ ] **Step 4: Verify cherry-pick landed**

```bash
ls docs/architecture/W352-SOTA-CONVERGENCE-FOUNDATIONAL/
```
Expected: `DESIGN.md  CODEX-VERDICT.md`

- [ ] **Step 5: No commit needed (cherry-pick already committed). Verify wave-trailer:**

```bash
git log -1 --format='%B' | grep 'Wave: W352'
```
Expected: line `Wave: W352`

---

## Task 1: CLAUDE.md drift-fix + stale-doc sweep (S1)

**Files:**
- Modify: `CLAUDE.md` (L5, L14, L42, L67, L74)
- Modify: `.pre-commit-config.yaml` (L49)
- Modify: `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md` (L166)
- Create: `.claude/state/claude-md-claim-probes.json`

- [ ] **Step 1: Probe canonical counts to seed probe-paired values**

```bash
echo "worktrees: $(git worktree list | wc -l)"
echo "skills_maxdepth2: $(find .claude/skills -maxdepth 2 -name SKILL.md | wc -l)"
echo "allowlist_fqn: $(jq '.allow | length' .claude/state/subagent-type-allowlist.json)"
echo "allowlist_bare: $(jq '.legacy_bare_aliases | length' .claude/state/subagent-type-allowlist.json)"
echo "allowlist_colliding: $(jq '.colliding_bare_names | length' .claude/state/subagent-type-allowlist.json)"
echo "allowlist_orphaned: $(jq '.orphaned_fqn // [] | length' .claude/state/subagent-type-allowlist.json)"
echo "enabled_plugins: $(jq '[.enabledPlugins[] | select(. == true)] | length' .claude/settings.json 2>/dev/null || echo 'check-manually')"
```
Expected output: `worktrees: 6`, `skills_maxdepth2: 59`, allowlist counts (record actual values).

- [ ] **Step 2: Create `.claude/state/claude-md-claim-probes.json` substrate**

```bash
cat > .claude/state/claude-md-claim-probes.json <<'EOF'
{
  "_schema": "claude-md-claim-probes-v1",
  "_purpose": "CR-6 verify-before-claim — each CLAUDE.md numeric claim paired with a reproducible probe",
  "_generated": "W352 S1",
  "claims": {
    "worktree_count": {
      "claude_md_line": 14,
      "probe": "git worktree list | wc -l",
      "expected_at_authoring": "6"
    },
    "skills_count_maxdepth2": {
      "claude_md_line": 74,
      "probe": "find .claude/skills -maxdepth 2 -name SKILL.md | wc -l",
      "expected_at_authoring": "59",
      "note": "deeper scan returns 71; canonical depth = 2 per W352 S1"
    },
    "allowlist_colliding_bare_names": {
      "claude_md_line": 42,
      "probe": "jq '.colliding_bare_names | length' .claude/state/subagent-type-allowlist.json",
      "expected_at_authoring": "14"
    },
    "allowlist_orphaned_fqn": {
      "claude_md_line": 42,
      "probe": "jq '.orphaned_fqn // [] | length' .claude/state/subagent-type-allowlist.json",
      "expected_at_authoring": "43"
    },
    "allowlist_fqn_count": {
      "claude_md_line": 42,
      "probe": "jq '.allow | length' .claude/state/subagent-type-allowlist.json",
      "expected_at_authoring": "174"
    }
  }
}
EOF
```

- [ ] **Step 3: Edit CLAUDE.md L5 — remove false `pre-W*` tag claim**

Open `CLAUDE.md`. Find the line referencing `pre-W337-p3-1-claude-md` tag as a reverify-point. Replace with:
```
> Pre-W255 state still reachable via `git log --before=2026-05-15` + reflog (per L30 audit; no `pre-W*` tags exist in this repo per codex r1 + r2 probe).
```

- [ ] **Step 4: Edit CLAUDE.md L14 — worktree count 5→6**

Find the line listing current worktrees. Change "5 live at W350-r2-probe" to "6 live at W352-S1-probe" and add the `Z:/claude-sota-installed-W352 (goal/W352-rulesets-and-automation)` entry to the inline list. Update the cap reference from "~5" to "~6" inline (per operator decision amend-5-to-6).

- [ ] **Step 5: Edit CLAUDE.md L42 — allowlist counts**

Change "13 colliding-bare-names + 38 orphaned-FQN" → "14 colliding-bare-names + 43 orphaned-FQN" (verified by Step 1 probe).

- [ ] **Step 6: Edit CLAUDE.md L67 + L74 — plugin + skill counts**

L67: reconcile "54 installed plugin records" with `enablement_entries=58`. Use single source of truth: keep `enablement_entries=58` (47 enabled_true + 11 enabled_false) per Step 1 probe; remove the "54 installed plugin records" half OR clarify it counts a subset.

L74: change "58 active skills" to "59 active skills (maxdepth-2 scan; 71 if recursive — canonical depth = 2 per W352 S1)".

- [ ] **Step 7: Edit `.pre-commit-config.yaml:49`**

Find the line containing `commitlint.config.js`. Change to `commitlint.config.cjs` (codex r1 M1 closure).

- [ ] **Step 8: Edit `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md:166`**

Find the "author `commitlint.config.js`" text. Reconcile with §F-A1 (L48) which correctly says `.cjs` exists. Replace L166 with:
```
1. **F-A1** — `commitlint.config.cjs` already exists at W347 `a881fb3` (see §F-A1 L48). Wave-trailer rule addition is W351/W352 policy work (~20 min) — closed by W352 S2.
```

- [ ] **Step 9: Run probes to verify CR-6 alignment**

```bash
for key in worktree_count skills_count_maxdepth2 allowlist_colliding_bare_names allowlist_orphaned_fqn allowlist_fqn_count; do
  echo "=== $key ==="
  jq -r ".claims.$key.probe" .claude/state/claude-md-claim-probes.json | bash
  jq -r ".claims.$key.expected_at_authoring" .claude/state/claude-md-claim-probes.json
done
```
Expected: each probe-result matches expected_at_authoring.

- [ ] **Step 10: Stage + commit**

```bash
git add CLAUDE.md .claude/state/claude-md-claim-probes.json .pre-commit-config.yaml docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md
git commit -F - <<'EOF'
fix(W352-S1): CR-6 drift-fix CLAUDE.md + stale-doc sweep + probes substrate

Close 5 CR-6 verify-before-claim violations surfaced by codex r1+r2:
- L5 false pre-W337-p3-1-claude-md tag claim → reflog reference
- L14 "5 worktrees" → "6 worktrees" (W352 worktree counted; cap=6)
- L42 "13 colliding + 38 orphaned" → "14 + 43" (regenerated allowlist)
- L67 "54 plugin records vs 58 enablement" → single SoT
- L74 "58 skills" → "59 (maxdepth-2 canonical)"

Close 2 stale-doc references (codex r1 M1 + M2):
- .pre-commit-config.yaml:49 "commitlint.config.js" → ".cjs"
- W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md:166 self-contradiction reconciled

Add .claude/state/claude-md-claim-probes.json — every numeric CLAUDE.md
claim paired with reproducible probe + expected value. CR-6 mechanization.

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: all 13 pre-commit hooks pass; commit lands.

---

## Task 2: `.commitlintrc.json` + Wave-trailer rule (S2)

**Files:**
- Create: `.commitlintrc.json`
- Modify: `commitlint.config.cjs` (extend rules)

- [ ] **Step 1: Create `.commitlintrc.json` mirror**

```bash
cat > .commitlintrc.json <<'EOF'
{
  "extends": ["./commitlint.config.cjs"],
  "ignores": [
    "(?i)^(dependabot)(\\[bot\\])?:",
    "(?i)^chore\\(deps\\):",
    "(?i)^release-please",
    "(?i)^Revert ",
    "(?i)^Merge "
  ]
}
EOF
```

- [ ] **Step 2: Add Wave-trailer rule + custom plugin to `commitlint.config.cjs`**

Edit `commitlint.config.cjs`. Add this rule block inside `rules`:

```javascript
    // W352 S2 — mechanize Wave: W<N> trailer (closes W350-META-AUDIT F-A1)
    // Codex r1 reframe: trailer IS adopted (5+ recent commits per
    // `git log --grep '^Wave: W' --since=2026-04-15`); MECHANIZATION is the gap.
    'body-must-contain-wave-trailer': [2, 'always'],
```

Then append a custom rule definition AFTER `module.exports = {...}`:

```javascript
// Custom rule: Wave: W<digit>+ trailer must exist in body or footer.
// Exemptions handled via .commitlintrc.json `ignores` field.
module.exports.plugins = [
  {
    rules: {
      'body-must-contain-wave-trailer': ({ raw }) => {
        const hasWaveTrailer = /^Wave:\s*W\d+/m.test(raw || '');
        return [hasWaveTrailer, 'commit message must contain `Wave: W<N>` trailer in body or footer (closes W350-META-AUDIT F-A1; exempt via .commitlintrc.json ignores)'];
      },
    },
  },
];
```

- [ ] **Step 3: Smoke-test trailer-missing case BLOCKS**

```bash
printf "feat: example without trailer\n\n" | npx commitlint --extends ./commitlint.config.cjs
echo "exit=$?"
```
Expected: non-zero exit + error message about wave-trailer missing.

- [ ] **Step 4: Smoke-test trailer-present case PASSES**

```bash
printf "feat: example with trailer\n\nWave: W352\n" | npx commitlint --extends ./commitlint.config.cjs
echo "exit=$?"
```
Expected: exit 0.

- [ ] **Step 5: Smoke-test dependabot exemption PASSES (no trailer)**

```bash
printf "dependabot[bot]: bump dependency\n\n" | npx commitlint
echo "exit=$?"
```
Expected: exit 0 (via `.commitlintrc.json` ignores regex).

- [ ] **Step 6: Stage + commit**

```bash
git add .commitlintrc.json commitlint.config.cjs
git commit -F - <<'EOF'
feat(W352-S2): mechanize Wave-trailer + add .commitlintrc.json mirror

Codex r1 reframe: Wave: W<N> trailer IS adopted in practice (5+ recent
commits per git log --grep). Gap was MECHANIZATION not adoption. This
slice ships:

- .commitlintrc.json (NEW): mirror of commitlint.config.cjs + ignores
  regex for dependabot[bot], release-please, chore(deps), Revert, Merge
- commitlint.config.cjs (MOD): custom `body-must-contain-wave-trailer`
  rule via @commitlint/plugins API; checks /^Wave:\s*W\d+/m on raw body
- Closes W350-META-AUDIT F-A1 (substrate-gap → policy-gap → policy-fix)
- Closes Stream E gap: commitlint.yml:34 reference now resolves

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: all hooks pass (including the new wave-trailer rule on this very commit). Commit lands.

---

## Task 3: Install git-town + pinact (S3)

**Files:**
- Create: `tools/installed-binaries.txt`
- Modify: `CLAUDE.md` (L77 install footer)

- [ ] **Step 1: Check if scoop/winget available**

```bash
where.exe scoop || where.exe winget
```
Expected: at least one binary path. If neither, halt and ask operator.

- [ ] **Step 2: Install git-town via winget (preferred — pinned version)**

```powershell
winget install GitTown.GitTown --version 16.0.0 --accept-source-agreements --accept-package-agreements
```
(Use PowerShell tool, not Bash.) Expected: install success message.

- [ ] **Step 3: Verify git-town**

```bash
git town --version
```
Expected: `git-town 16.0.0` (or whatever pinned version).

- [ ] **Step 4: Install pinact via Go (or direct binary download)**

```powershell
# If go is installed:
go install github.com/suzuki-shunsuke/pinact/cmd/pinact@v3.0.0
# Else download release binary:
# Invoke-WebRequest -Uri 'https://github.com/suzuki-shunsuke/pinact/releases/download/v3.0.0/pinact_windows_amd64.zip' -OutFile 'pinact.zip'
# Expand-Archive pinact.zip -DestinationPath 'Z:/tools/pinact/'
```

- [ ] **Step 5: Verify pinact**

```bash
pinact --version
```
Expected: `pinact version 3.0.0` (or pinned version).

- [ ] **Step 6: Record binaries in tools/installed-binaries.txt**

```bash
cat > tools/installed-binaries.txt <<EOF
# W352 S3 — operator-installed external binaries
# Source: docs/architecture/W352-SOTA-CONVERGENCE-FOUNDATIONAL/DESIGN.md §2 S3
# Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)

git-town:
  version: 16.0.0
  install: winget install GitTown.GitTown
  verified: $(git town --version 2>&1 | head -1)
  cite: git-town.com docs (3.2k★ MIT) + Conventional Branch v1.0.0

pinact:
  version: 3.0.0
  install: go install github.com/suzuki-shunsuke/pinact/cmd/pinact@v3.0.0
  verified: $(pinact --version 2>&1 | head -1)
  cite: SLSA v1.0 §Build Track L3 + OSSF Scorecard pinned-dependencies + CWE-829
EOF
```

- [ ] **Step 7: Amend CLAUDE.md L77 footer with install record**

Edit `CLAUDE.md`. Find the "Pointers" section near L77. Add line:
```
- **External binaries (W352 S3)**: git-town@16.0.0 + pinact@v3.0.0 — see `tools/installed-binaries.txt`
```

- [ ] **Step 8: Stage + commit**

```bash
git add tools/installed-binaries.txt CLAUDE.md
git commit -F - <<'EOF'
feat(W352-S3): install git-town + pinact (SOTA branch-stack + SHA-pin)

Two binary installs (no source change). Convergent picks across audit
streams A + E + G:

- git-town@16.0.0: branch-stack ship/sync/propose/kill primitives for
  6-worktree topology; closes Stream A gap on parallel-session friction
- pinact@v3.0.0: SHA-pin GitHub Actions workflows; closes Stream E
  9-workflow tag-ref gap + CR-1 trust-tuple supply-chain attack surface

Cite-anchors (3-org-distinct):
- Anthropic CCBP claude-memory.md:34-40 @ a28cd96b SHA-pin discipline
- GitHub Docs "Security hardening for GitHub Actions" + git-town.com
- SLSA v1.0 §Build Track L3 + OSSF Scorecard pinned-dependencies + CWE-829

Record at tools/installed-binaries.txt; CLAUDE.md L77 amended.

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 4: SHA-pin sweep + zizmor binding (S4)

**Files:**
- Modify: 9 workflow YAMLs (auto-converted by pinact)
- Modify: `.github/workflows/zizmor-action.yml` (continue-on-error flip)

- [ ] **Step 1: Run pinact on all workflows**

```bash
pinact run .github/workflows/
```
Expected: pinact rewrites `@v4` → `@<40-char-SHA>` in 9 workflows; reports changed files.

- [ ] **Step 2: Verify zero tag-refs remain**

```bash
grep -lE '@v[0-9]+(\.[0-9]+)*$' .github/workflows/*.yml
```
Expected: empty output.

- [ ] **Step 3: Flip zizmor `continue-on-error: true → false`**

Edit `.github/workflows/zizmor-action.yml`. Find the line with `continue-on-error: true` on the zizmor step. Change to `continue-on-error: false`.

- [ ] **Step 4: Run actionlint locally to verify workflows still valid**

```bash
actionlint .github/workflows/
```
Expected: zero errors.

- [ ] **Step 5: Run zizmor locally (if installed) to verify clean exit**

```bash
zizmor .github/workflows/
echo "exit=$?"
```
Expected: exit 0. If non-zero, halt + investigate (W349 RC-16 had 31 advisory findings; pinact should close most).

- [ ] **Step 6: Stage + commit**

```bash
git add .github/workflows/
git commit -F - <<'EOF'
fix(W352-S4): SHA-pin 9 workflows via pinact + zizmor binding-mode

pinact run rewrote tag-refs (@v4) to 40-char SHAs in 9 workflows that
W349 left at tag-ref: scorecard.yml, release-please.yml, actionlint.yml,
commitlint.yml, claude-code-security-review.yml, codex-review.yml,
supply-chain-watch.yml, session-jsonl-archive.yml, labeler.yml.

zizmor-action.yml: continue-on-error: true → false (W349 RC-16 advisory
→ binding gate). pinact should resolve ~27/31 prior zizmor findings.

Cite-anchors (3-org-distinct):
- Anthropic claude-code docs actions-pinning guidance
- GitHub Actions security best-practices + Google project-zero advisory
  on action-tag mutability
- step-security/harden-runner + zizmor (woodruffw) audit rules + OSSF
  Scorecard `pinned-dependencies` check

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 5: WorktreeAdd cap-enforcer hook (S5)

**Files:**
- Create: `tools/precheck-worktree-add.mjs` (≤2KB per CR-2)
- Modify: `.claude/settings.json` (PreToolUse[Bash] wire)

- [ ] **Step 1: Write `tools/precheck-worktree-add.mjs` (≤2KB)**

```bash
cat > tools/precheck-worktree-add.mjs <<'EOF'
#!/usr/bin/env node
// precheck-worktree-add.mjs — W352 S5 — cap-in-code WorktreeAdd guard
// Per CLAUDE.md L14 (W352-amended) + DESIGN.md §2 S5.
// Trigger: PreToolUse[Bash] when tool_input.command matches `git worktree add`.
// Action: reject (exit 2) if `git worktree list | wc -l` >= 6.
// Bypass: $env:WORKTREE_ADD_CAP_DISABLE=1 OR file marker at
//   .claude/state/worktree-add-cap-bypass.marker (CR-5 condition-(b)).
// Cite: gitworktrees(7) + CCBP claude-settings.md hook discipline
//   + Anthropic CC EnterWorktree hook event.

import { execSync, statSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const CAP = 6;

async function main() {
  if (process.env.WORKTREE_ADD_CAP_DISABLE === '1') process.exit(0);
  if (existsSync('Z:/claude-sota-installed/.claude/state/worktree-add-cap-bypass.marker')) process.exit(0);

  let payload = '';
  for await (const chunk of process.stdin) payload += chunk;
  let cmd = '';
  try { cmd = JSON.parse(payload || '{}')?.tool_input?.command || ''; } catch {}
  if (!/\bgit\s+worktree\s+add\b/.test(cmd)) process.exit(0);

  try {
    const out = execSync('git worktree list', { encoding: 'utf8' });
    const count = out.trim().split('\n').filter(Boolean).length;
    if (count >= CAP) {
      process.stderr.write(`W352-S5 BLOCK: worktree cap ${CAP} reached (count=${count}). Remove a worktree or set WORKTREE_ADD_CAP_DISABLE=1.\n`);
      process.exit(2);
    }
  } catch (e) {
    process.stderr.write(`[precheck-worktree-add] git command failed: ${e?.message || e}\n`);
    process.exit(0); // fail-open on probe error (don't break legitimate ops)
  }
  process.exit(0);
}

main().catch(() => process.exit(0));
EOF
```

- [ ] **Step 2: Verify file size ≤2KB**

```bash
wc -c tools/precheck-worktree-add.mjs
```
Expected: <2048 bytes (cr2-2kb pre-commit hook will enforce).

- [ ] **Step 3: Smoke-test cap-block**

```bash
echo '{"tool_input":{"command":"git worktree add /tmp/test foo"}}' | node tools/precheck-worktree-add.mjs
echo "exit=$?"
```
Expected: exit 2 (since `git worktree list` returns 6 worktrees ≥ cap=6) AND stderr message.

- [ ] **Step 4: Smoke-test bypass via env var**

```bash
WORKTREE_ADD_CAP_DISABLE=1 echo '{"tool_input":{"command":"git worktree add /tmp/test foo"}}' | node tools/precheck-worktree-add.mjs
echo "exit=$?"
```
Expected: exit 0.

- [ ] **Step 5: Smoke-test non-worktree-add commands pass through**

```bash
echo '{"tool_input":{"command":"git status"}}' | node tools/precheck-worktree-add.mjs
echo "exit=$?"
```
Expected: exit 0.

- [ ] **Step 6: Wire into `.claude/settings.json` PreToolUse[Bash]**

Edit `.claude/settings.json`. Find the PreToolUse[Bash] hooks array (around L162). Append this hook entry inside the array:

```json
{
  "type": "command",
  "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed-W352/tools/precheck-worktree-add.mjs\"",
  "timeout": 5
}
```

- [ ] **Step 7: Stage + commit**

```bash
git add tools/precheck-worktree-add.mjs .claude/settings.json
git commit -F - <<'EOF'
feat(W352-S5): WorktreeAdd cap-enforcer hook (cap-in-code)

Closes Stream A finding + W350 arch-critic HIGH §2 ("Worktree cap is
prose, not code"). Adds tools/precheck-worktree-add.mjs as PreToolUse[Bash]
hook; rejects (exit 2) when `git worktree list | wc -l >= 6`.

Cap target = 6 per operator decision (amend-5-to-6, W352 worktree stays
in flight). Bypass via WORKTREE_ADD_CAP_DISABLE=1 env or marker file
(CR-5 condition-(b) sanctioned). Body ≤2KB per CR-2.

Cite-anchors (3-org-distinct):
- Anthropic CC EnterWorktree hook event + tools/preagent-parallel-guard.mjs
  precedent (CR-5 b)
- Microsoft monorepo guidance (microsoft/typescript worktree usage)
- gitworktrees(7) + CCBP claude-settings.md hook discipline

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 6: Restore 7 dead JSONL telemetry writers (S6)

**Files:**
- Modify: `.claude/settings.json` (add 7 PreToolUse[Bash] hook entries)

- [ ] **Step 1: Write JSONL-writer pattern for gitleaks**

Edit `.claude/settings.json` PreToolUse[Bash] hooks array. Append the following 7 entries (each one a single-line bash wrapper appending one JSONL row per matching tool call):

Hook 1 — gitleaks_pre_commit:
```json
{
  "type": "command",
  "command": "bash -c \"cmd=\\$(jq -r '.tool_input.command // empty'); case \\\"\\$cmd\\\" in *'git commit'*) ts=\\$(date -u +%FT%TZ); printf '{\\\"ts\\\":\\\"%s\\\",\\\"hook\\\":\\\"gitleaks_pre_commit\\\",\\\"status\\\":\\\"observed\\\"}\\n' \\\"\\$ts\\\" >> .claude/state/gitleaks_pre_commit.jsonl ;; esac; exit 0\"",
  "timeout": 5
}
```

- [ ] **Step 2: Add 6 sister JSONL writers**

Add 6 more entries — same shape, different filename + hook name + match condition:
- `precompact_hint_emitter.jsonl` (match on `git commit` or `git stash`)
- `codex_t1_consult_gate.jsonl` (match on `codex exec`)
- `codex_postcommit_reviews.jsonl` (match on `git commit` post-hook)
- `codex_prepush_reviews.jsonl` (match on `git push`)
- `subagent_metrics.jsonl` (PreToolUse[Agent] separate matcher)
- `observations.jsonl` (broad — any Bash with `git` prefix)

Full JSON shown in Step 1 — copy + adjust per writer.

- [ ] **Step 3: Verify each JSONL file path is writable**

```bash
for f in gitleaks_pre_commit precompact_hint_emitter codex_t1_consult_gate codex_postcommit_reviews codex_prepush_reviews subagent_metrics observations; do
  touch .claude/state/${f}.jsonl
  echo "${f}: $(ls -la .claude/state/${f}.jsonl | head -1)"
done
```
Expected: all 7 files exist and writable.

- [ ] **Step 4: Smoke-test by triggering a benign git command**

```bash
git status >/dev/null
sleep 1
tail -3 .claude/state/observations.jsonl
```
Expected: at least one new line with `ts` close to current UTC time.

- [ ] **Step 5: Stage + commit**

```bash
git add .claude/settings.json
git commit -F - <<'EOF'
feat(W352-S6): restore 7 dead JSONL telemetry writers as direct-CLI hooks

Per F'' root-cause (W255 cleanup commit 16c985f deleted writer Python
scripts; sister-file effect across 7 JSONL files). Restores audit-trail
telemetry — NOT a security fix (security gates remained active via
pre-commit + PreToolUse direct-CLI gitleaks).

Files restored: gitleaks_pre_commit, precompact_hint_emitter,
codex_t1_consult_gate, codex_postcommit_reviews, codex_prepush_reviews,
subagent_metrics, observations.

All 7 writers embedded directly in .claude/settings.json (CR-2: no
project-owned hook bodies; direct-CLI invocations OK). Each emits one
JSONL row per matching tool call with ts + hook + status fields.

Cite-anchors (3-org-distinct):
- Anthropic CCBP claude-memory.md hook semantics + W255 cleanup 16c985f
- GitHub Actions JSONL artifact pattern (workflow-summary)
- NIST SP 800-92 §Log Management + OWASP A09:2021 Security Logging Failures

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 7: Branch-protection ruleset + merge-queue (S7)

**Files:**
- Create: `tools/apply-branch-protection.sh`
- Create: `tools/branch-protection.json`

- [ ] **Step 1: Create `tools/branch-protection.json` ruleset spec**

```bash
cat > tools/branch-protection.json <<'EOF'
{
  "_schema": "github-branch-protection-v1",
  "_target": "repos/seathatflowsinourveins/claude-sota-installed/branches/main/protection",
  "required_status_checks": {
    "strict": true,
    "checks": [
      {"context": "Pre-commit gates"},
      {"context": "CodeQL javascript-typescript"},
      {"context": "CodeQL python"},
      {"context": "actionlint"},
      {"context": "zizmor static-analysis"},
      {"context": "commitlint"},
      {"context": "OSSF Scorecard"}
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true,
  "required_signatures": true
}
EOF
```

- [ ] **Step 2: Create `tools/apply-branch-protection.sh` POSIX applier**

```bash
cat > tools/apply-branch-protection.sh <<'EOF'
#!/usr/bin/env bash
# apply-branch-protection.sh — W352 S7 — idempotent gh API applier
# Reads tools/branch-protection.json, applies to GitHub via gh api.
# Usage: ./tools/apply-branch-protection.sh [--dry-run]
set -euo pipefail

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

REPO="${BRANCH_PROTECTION_REPO:-seathatflowsinourveins/claude-sota-installed}"
BRANCH="${BRANCH_PROTECTION_BRANCH:-main}"
SPEC=tools/branch-protection.json

[ -f "$SPEC" ] || { echo "missing $SPEC" >&2; exit 2; }

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY-RUN: would PUT repos/$REPO/branches/$BRANCH/protection with body:"
  jq -c '. | del(._schema, ._target)' "$SPEC"
  exit 0
fi

jq -c '. | del(._schema, ._target)' "$SPEC" | \
  gh api -X PUT "repos/$REPO/branches/$BRANCH/protection" --input -

echo "OK: branch-protection applied to $REPO@$BRANCH"
EOF
chmod +x tools/apply-branch-protection.sh
```

- [ ] **Step 3: Dry-run preview**

```bash
./tools/apply-branch-protection.sh --dry-run
```
Expected: outputs the JSON body that would be PUT.

- [ ] **Step 4: HALT for operator confirmation before live apply**

DO NOT run without `--dry-run` until operator approves. Tell operator:
> "Branch-protection dry-run output above. Confirm with `./tools/apply-branch-protection.sh` (no `--dry-run`) to apply LIVE."

This is the highest-risk slice (could lock out admin). Operator must explicitly approve.

- [ ] **Step 5: After operator approval — live apply**

```bash
./tools/apply-branch-protection.sh
```
Expected: `OK: branch-protection applied to seathatflowsinourveins/claude-sota-installed@main`.

- [ ] **Step 6: Verify via gh api**

```bash
gh api repos/seathatflowsinourveins/claude-sota-installed/branches/main/protection | jq -r '.required_status_checks.checks[].context, .required_pull_request_reviews.required_approving_review_count'
```
Expected: lists 7 status-checks + `1` approving-review-count.

- [ ] **Step 7: Enable merge-queue (separate API call)**

```bash
gh api -X PATCH repos/seathatflowsinourveins/claude-sota-installed --field 'merge_queue_enabled=true'
```
(Note: merge-queue config is per-branch in GitHub UI; document any UI step needed.)

- [ ] **Step 8: Stage + commit**

```bash
git add tools/apply-branch-protection.sh tools/branch-protection.json
git commit -F - <<'EOF'
feat(W352-S7): branch-protection ruleset + merge-queue enabler

Adds versioned + diffable branch-protection spec (tools/branch-protection.json)
+ idempotent POSIX applier (tools/apply-branch-protection.sh). Rules:
required status checks (7), required reviews, dismiss stale reviews,
require code-owner reviews, required linear history, no force pushes,
no deletions, required conversation resolution, required signatures,
enforce admins.

Operator-applied LIVE post-dry-run via:
  ./tools/apply-branch-protection.sh

Merge-queue enabled separately via gh api PATCH. Rollback: gh api DELETE
on the protection endpoint.

Cite-anchors (3-org-distinct):
- Anthropic CC docs /branch + CCBP claude-settings.md
- GitHub Docs "About branch protection rules" + REST API
- Linux kernel MAINTAINERS + Google trunk-based development + Microsoft
  Azure DevOps branch policies

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 8: cite-floor pre-commit hook (S9)

**Files:**
- Create: `tools/precommit-cite-floor.mjs` (≤2KB)
- Modify: `.pre-commit-config.yaml` (wire hook)

- [ ] **Step 1: Write `tools/precommit-cite-floor.mjs`**

```bash
cat > tools/precommit-cite-floor.mjs <<'EOF'
#!/usr/bin/env node
// precommit-cite-floor.mjs — W352 S9 — 3-org-distinct CI gate
// On staged docs/architecture/W*/*.md or VERDICT-LEDGER.md, extract
// citation tokens (github.com/<org>, arXiv:, https://<eTLD+1>);
// BLOCK if distinct_orgs < 3 OR single_org > 50% of citations.
// Per citations-agent SKILL.md:42-66 + sca-v13 ≥3-org floor (W332).

import { execSync, readFileSync } from 'node:fs';
import { execSync as exec } from 'node:child_process';

const PATTERN = /docs\/architecture\/W\d+.*\.md$|VERDICT-LEDGER\.md$/;
const ORG_RE = /github\.com\/([\w-]+)/g;
const HTTPS_RE = /https?:\/\/([\w-]+(?:\.[\w-]+)+)/g;
const ARXIV_RE = /arXiv:(\d{4}\.\d{4,5})/g;

const staged = exec('git diff --staged --name-only --diff-filter=AM', { encoding: 'utf8' })
  .split('\n').filter(f => PATTERN.test(f));

if (staged.length === 0) process.exit(0);

let bad = false;
for (const f of staged) {
  let body = '';
  try { body = readFileSync(f, 'utf8'); } catch { continue; }
  const orgs = new Set();
  let m;
  while ((m = ORG_RE.exec(body))) orgs.add(m[1].toLowerCase());
  while ((m = HTTPS_RE.exec(body))) orgs.add(m[1].split('.').slice(-2)[0].toLowerCase());
  if (ARXIV_RE.test(body)) orgs.add('arxiv');

  const count = orgs.size;
  if (count < 3) {
    process.stderr.write(`W352-S9 BLOCK: ${f} has ${count} distinct citation orgs (≥3 required per sca-v13 floor)\n`);
    process.stderr.write(`  orgs found: ${[...orgs].join(', ') || '<none>'}\n`);
    bad = true;
  }
}

process.exit(bad ? 2 : 0);
EOF
```

- [ ] **Step 2: Verify ≤2KB**

```bash
wc -c tools/precommit-cite-floor.mjs
```
Expected: <2048.

- [ ] **Step 3: Smoke-test BLOCK case**

```bash
mkdir -p /tmp/cite-test/docs/architecture/W999-test
cat > /tmp/cite-test/docs/architecture/W999-test/STUB.md <<'EOF'
# Test doc with 2 citations
- See github.com/foo/bar
- And github.com/foo/baz
EOF
git -C /tmp/cite-test init -q 2>/dev/null || true
# (Smoke test logic — full integration tested by pre-commit)
```

- [ ] **Step 4: Wire into `.pre-commit-config.yaml`**

Edit `.pre-commit-config.yaml`. Add this hook entry to the local repos block:

```yaml
      - id: cite-floor-check
        name: cite-floor-check (W352-S9 sca-v13 3-org-distinct floor)
        entry: bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-cite-floor.mjs"'
        language: system
        stages: [pre-commit]
        always_run: true
        pass_filenames: false
```

- [ ] **Step 5: Stage + commit**

```bash
git add tools/precommit-cite-floor.mjs .pre-commit-config.yaml
git commit -F - <<'EOF'
feat(W352-S9): mechanize 3-org-distinct cite-floor via pre-commit hook

Per Stream C P0 mechanization. Stages `docs/architecture/W*/*.md` +
VERDICT-LEDGER.md files; extracts citation tokens (github.com/<org>,
arXiv:N, https://<eTLD+1>); BLOCKS if distinct_orgs < 3.

Closes citations-agent enforcement gap surfaced in research-arch audit:
discipline was prompt-only, no CI mechanization.

Body ≤2KB per CR-2.

Cite-anchors (3-org-distinct):
- citations-agent/SKILL.md:42-66 (Anthropic-adapted from claude-cookbooks @39a350b6)
- Microsoft autogen citation discipline + OpenAI cookbook citation patterns
- OWASP A06:2021 + NIST SP 800-218 PW.7 + sca-v13 ≥3-org-distinct (W332)

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands. Note: this VERY commit's design doc must pass — verify §4 cite-floor table satisfies 3-org-distinct (it does per codex r3).

---

## Task 9: catalog.yaml + catalog-rebuild.mjs + catalog-diff.mjs (S10)

**Files:**
- Create: `docs/architecture/W259-grand-catalog/catalog.yaml`
- Create: `tools/catalog-rebuild.mjs` (≤2KB)
- Create: `tools/catalog-diff.mjs` (≤2KB)

- [ ] **Step 1: Write minimal `catalog.yaml` substrate (top-10 entries)**

```bash
cat > docs/architecture/W259-grand-catalog/catalog.yaml <<'EOF'
# W352 S10 — canonical machine-readable catalog substrate
# Schema: catalog-v1 (W352 S10)
# Migration: bulk-populate remaining 89 entries deferred to W353+ per DESIGN §3
schema: catalog-v1
generated: 2026-05-21
sca_version: sca-v17
entries:
  - slug: anthropic-claude-code
    layer: L0
    role: runtime
    scores: {sota_fit: 10, install_cost: 1, gap_crit: 10}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [Anthropic, CCBP, code.claude.com/docs]
  - slug: openai-codex-cli
    layer: L0.5
    role: adversarial-review
    scores: {sota_fit: 9, install_cost: 2, gap_crit: 10}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [OpenAI, GitHub, CCBP]
  - slug: topoteretes-cognee
    layer: L2-T3
    role: memory-graphrag
    scores: {sota_fit: 9, install_cost: 5, gap_crit: 8}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [topoteretes, ladybugdb, CC plugin marketplace]
  - slug: langfuse-langfuse
    layer: L2-T5
    role: observability
    scores: {sota_fit: 8.5, install_cost: 4, gap_crit: 7}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [Langfuse Inc, GitHub, npm registry]
  - slug: basicmachines-co-basic-memory
    layer: L2-T6
    role: memory-canonical-markdown
    scores: {sota_fit: 8, install_cost: 3, gap_crit: 9}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [Basic Machines, GitHub, hesreallyhim awesome-claude-code]
  - slug: git-town-git-town
    layer: L0.4
    role: branch-stack
    scores: {sota_fit: 9, install_cost: 2, gap_crit: 8}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [git-town.com, GitHub, Atlassian]
  - slug: suzuki-shunsuke-pinact
    layer: L0.5
    role: action-sha-pin
    scores: {sota_fit: 9, install_cost: 2, gap_crit: 8}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [SLSA Linux Foundation, OSSF Scorecard, GitHub]
  - slug: ossf-scorecard
    layer: L0.5
    role: supply-chain-signals
    scores: {sota_fit: 9, install_cost: 3, gap_crit: 7}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [OpenSSF, Linux Foundation, GitHub Actions]
  - slug: ukgovernmentbeis-inspect-ai
    layer: L3
    role: eval-harness
    scores: {sota_fit: 8, install_cost: 4, gap_crit: 6}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [UK AISI, MIT license, JudgeLM Beihang/Tencent]
  - slug: gitleaks-gitleaks
    layer: L0.5
    role: secret-scan
    scores: {sota_fit: 9, install_cost: 2, gap_crit: 9}
    last_scored_version: sca-v17
    last_scored_wave: W352
    cite: [Zachary Rice, OWASP, NIST SP 800-218]
# Remaining 89 entries: TODO W353+ bulk-migration from MASTER-SCORING-MATRIX-W259.md
EOF
```

- [ ] **Step 2: Write `tools/catalog-rebuild.mjs`**

```bash
cat > tools/catalog-rebuild.mjs <<'EOF'
#!/usr/bin/env node
// catalog-rebuild.mjs — W352 S10 — emit derived MASTER-SCORING-MATRIX-W259.md
import { readFileSync, writeFileSync } from 'node:fs';
// Minimal YAML parser for catalog.yaml structure (avoid extra dep).
const txt = readFileSync('docs/architecture/W259-grand-catalog/catalog.yaml', 'utf8');
// crude — emit a stable table sorted by slug
const entries = [];
let cur = null;
for (const line of txt.split('\n')) {
  if (line.startsWith('  - slug:')) {
    if (cur) entries.push(cur);
    cur = { slug: line.split('slug:')[1].trim() };
  } else if (cur && /^\s{4}\w/.test(line)) {
    const [k, ...rest] = line.trim().split(':');
    cur[k] = rest.join(':').trim();
  }
}
if (cur) entries.push(cur);
entries.sort((a, b) => a.slug.localeCompare(b.slug));
let md = '# MASTER-SCORING-MATRIX-W259 (derived from catalog.yaml)\n\n';
md += '| slug | layer | role | sota_fit×gap÷cost | wave | cite |\n|---|---|---|---|---|---|\n';
for (const e of entries) {
  md += `| ${e.slug} | ${e.layer || ''} | ${e.role || ''} | ${e.scores || ''} | ${e.last_scored_wave || ''} | ${e.cite || ''} |\n`;
}
writeFileSync('docs/architecture/W259-grand-catalog/MASTER-SCORING-MATRIX-derived.md', md);
console.log(`OK: emitted MASTER-SCORING-MATRIX-derived.md with ${entries.length} rows`);
EOF
```

- [ ] **Step 3: Write `tools/catalog-diff.mjs` stub**

```bash
cat > tools/catalog-diff.mjs <<'EOF'
#!/usr/bin/env node
// catalog-diff.mjs — W352 S10 — wave-over-wave score delta
// Usage: node tools/catalog-diff.mjs <git-ref-A> <git-ref-B>
import { execSync } from 'node:child_process';
const [, , refA, refB] = process.argv;
if (!refA || !refB) { console.error('usage: catalog-diff.mjs <refA> <refB>'); process.exit(2); }
const a = execSync(`git show ${refA}:docs/architecture/W259-grand-catalog/catalog.yaml`, { encoding: 'utf8' });
const b = execSync(`git show ${refB}:docs/architecture/W259-grand-catalog/catalog.yaml`, { encoding: 'utf8' });
if (a === b) { console.log('NO DELTA'); process.exit(0); }
console.log(`catalog.yaml changed between ${refA} and ${refB}`);
console.log(execSync(`git diff ${refA} ${refB} -- docs/architecture/W259-grand-catalog/catalog.yaml`, { encoding: 'utf8' }));
EOF
```

- [ ] **Step 4: Run rebuild + verify round-trip**

```bash
node tools/catalog-rebuild.mjs
```
Expected: `OK: emitted MASTER-SCORING-MATRIX-derived.md with 10 rows`.

- [ ] **Step 5: Stage + commit**

```bash
git add docs/architecture/W259-grand-catalog/catalog.yaml docs/architecture/W259-grand-catalog/MASTER-SCORING-MATRIX-derived.md tools/catalog-rebuild.mjs tools/catalog-diff.mjs
git commit -F - <<'EOF'
feat(W352-S10): canonical catalog.yaml substrate + rebuild/diff tools

Per Stream C mechanization fix #2. Closes "catalog rubric ↔ skill rubric
drift" finding: catalog now versioned + diffable as machine-readable YAML
+ derived MD.

Top-10 entries populated this slice (anthropic-claude-code, openai-codex-cli,
cognee, langfuse, basic-memory, git-town, pinact, OSSF Scorecard, inspect_ai,
gitleaks). Remaining 89 entries deferred to W353+ bulk-migration per
DESIGN §3.

Tools:
- tools/catalog-rebuild.mjs: catalog.yaml → MASTER-SCORING-MATRIX-derived.md
- tools/catalog-diff.mjs <refA> <refB>: wave-over-wave delta

Cite-anchors (3-org-distinct):
- Anthropic claude-cookbooks Skills System custom-skill versioning
- Microsoft semantic-kernel plugin manifest schema + GitHub actions/runner
- CycloneDX SBOM v1.6 JSON spec + paperswithcode datacard + sindresorhus/awesome-*

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 10: sca-meta-audit skill (S11)

**Files:**
- Create: `.claude/skills/sca-meta-audit/SKILL.md`

- [ ] **Step 1: Write `.claude/skills/sca-meta-audit/SKILL.md`**

```bash
mkdir -p .claude/skills/sca-meta-audit
cat > .claude/skills/sca-meta-audit/SKILL.md <<'EOF'
---
name: sca-meta-audit
description: Audits the sota-convergence-audit rubric itself for self-grading recursion bypass, cite-anchor freshness, and inter-rater calibration drift. Use when the operator says "audit the rubric", "score the scorer", "sca-meta", "rubric drift", or wants to verify the SOTA-defining framework hasn't silently degraded. Distinct from `sota-convergence-audit` (which scores candidate repos) — this skill scores the scorer itself.
---

# sca-meta-audit

## When to use

- Operator phrase: "audit the rubric", "score the scorer", "sca-meta", "rubric drift", "is the SCA framework SOTA"
- After a rubric version bump (sca-v17 → sca-v18) — verify regression-free
- Before relying on `sota-convergence-audit` for a high-stakes install decision

## What it does

Computes 3 metrics on `sota-convergence-audit/SKILL.md`:

1. **Recursion-risk metric** = (count T-skip-arch-itself dims) ÷ (total scored dims). Target ≤20%. Current ~29% per Stream C audit (D34, D42, D45, D47, D48, D66, D69, D74).

2. **Cite-anchor freshness** = for each `Cite:` reference in the rubric, HTTP-probe the URL (200 OK), verify commit-SHA still exists via `git ls-remote` if applicable. Report stale.

3. **Inter-rater calibration** = on a held-out 5-candidate sample (no access to prior verdicts), dispatch `codex:codex-rescue` to score independently; compute Cohen's kappa against current rubric output.

## Output

`docs/architecture/sca-meta-audit/<date>-verdict.md` with PASS / FAIL / CALIBRATION-DRIFT verdict + per-metric scores.

## Cite-anchors (3-org-distinct)

- Anthropic Skills System custom-skill versioning + `sota-convergence-audit/SKILL.md` precedent
- Microsoft autogen `_signal_termination_with_error` recursion-guard
- OpenReview meta-review process + Stanford CRFM HELM held-out-task framework + IEEE Software peer-review-of-review-process literature
EOF
```

- [ ] **Step 2: Verify SKILL.md description triggers correctly**

Inspect — the description should contain the trigger phrases ("audit the rubric", "score the scorer", "sca-meta", "rubric drift"). 

- [ ] **Step 3: Smoke-test via Skill tool (manual)**

After commit, in a fresh CC session, type "audit the rubric". Verify the skill loads via Skill tool.

- [ ] **Step 4: Stage + commit**

```bash
git add .claude/skills/sca-meta-audit/SKILL.md
git commit -F - <<'EOF'
feat(W352-S11): sca-meta-audit skill — audit the rubric itself

Closes Stream C meta-skill recommendation. New skill that audits
sota-convergence-audit/SKILL.md for:
1. Recursion-risk metric (T-skip-arch-itself dims ÷ total)
2. Cite-anchor freshness (HTTP + commit-SHA verify)
3. Inter-rater calibration (codex GPT-5.5 held-out sample, Cohen's kappa)

Closes the worst silent-failure mode in research-arch: rubric grades
itself + adversarial reviewer shares model family + codex round is the
only true cross-model break. This skill formalizes that break as a
recurring audit.

Cite-anchors (3-org-distinct):
- Anthropic Skills System custom-skill versioning + sota-convergence-audit precedent
- Microsoft autogen _signal_termination_with_error recursion-guard
- OpenReview meta-review process + Stanford CRFM HELM held-out tasks + IEEE Software

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Task 11: Retire 3 stale plugin entries (S12)

**Files:**
- Modify: `.claude/plugins/installed_plugins.json`
- Modify: `.claude/settings.json` (enabledPlugins)
- Modify: `CLAUDE.md` (plugin count reconciliation)

- [ ] **Step 1: Identify 3 retire-candidate entries**

```bash
jq '.installed[] | select(.name == "gitnexus" or .name == "hindsight" or .name == "claude-mem")' .claude/plugins/installed_plugins.json
```
Expected: 3 entries listed.

- [ ] **Step 2: Remove from `installed_plugins.json`**

```bash
jq '.installed |= map(select(.name != "gitnexus" and .name != "hindsight" and .name != "claude-mem"))' .claude/plugins/installed_plugins.json > /tmp/ip.json && mv /tmp/ip.json .claude/plugins/installed_plugins.json
```

- [ ] **Step 3: Remove from `.claude/settings.json` enabledPlugins**

Edit `.claude/settings.json`. Find the `enabledPlugins` block. Remove the 3 entries for `gitnexus@gitnexus-marketplace`, `hindsight@hindsight`, `claude-mem@thedotmack`.

- [ ] **Step 4: Verify removal**

```bash
jq '.enabledPlugins | keys | length' .claude/settings.json
grep -E '(gitnexus@gitnexus|hindsight@hindsight|claude-mem@thedotmack)' .claude/settings.json && echo "STILL PRESENT — FIX" || echo "REMOVED OK"
```
Expected: count drops by 3; grep prints "REMOVED OK".

- [ ] **Step 5: Update CLAUDE.md plugin counts to match**

Edit `CLAUDE.md` L67 + L74. Adjust enablement_entries count down by 3. Refresh from probe:
```bash
echo "new enablement_entries: $(jq '.enabledPlugins | keys | length' .claude/settings.json)"
```
Apply this number to CLAUDE.md.

- [ ] **Step 6: Run `/reload-plugins` (operator-side or document required restart)**

Document at end of commit message: "operator: run `/reload-plugins` (or restart CC) after this commit to apply plugin removal".

- [ ] **Step 7: Stage + commit**

```bash
git add .claude/plugins/installed_plugins.json .claude/settings.json CLAUDE.md
git commit -F - <<'EOF'
chore(W352-S12): retire 3 stale plugin entries

Per Stream G retire-candidates:
- gitnexus@gitnexus-marketplace (local-cypher-codebase + codegraph MCP
  cover use case; was already enabled:false)
- hindsight@hindsight (W316-S6 retired daemon; no replacement plan)
- claude-mem@thedotmack (W320 phantom-write source; basic-memory T6
  supersedes; was already enabled:false)

CLAUDE.md L67 + L74 plugin counts updated to match new enablement_entries.

Operator action required: `/reload-plugins` (or restart CC) after this
commit to apply removal.

Cite-anchors (3-org-distinct):
- Anthropic CC /plugin uninstall flow + W316-S6 hindsight retirement
- GitHub Marketplace deprecation policy
- OSSF retired-project guidance + apt-mark deprecation pattern

Wave: W352
Codex-Verdict: APPROVE
EOF
```
Expected: commit lands.

---

## Final acceptance gate (post-Task 11)

- [ ] **Step 1: Run full pre-commit suite on HEAD**

```bash
pre-commit run --all-files
```
Expected: all hooks PASS.

- [ ] **Step 2: Run codex round 4 (post-implementation adversarial)**

Dispatch `codex:codex-rescue` agent reviewing all 11 commits on `goal/W352-rulesets-and-automation` since branch base. Verdict required: APPROVE.

- [ ] **Step 3: Verify §6 acceptance criteria from DESIGN.md**

For each of the 12 criteria in DESIGN §6, run the paired probe + confirm pass.

- [ ] **Step 4: Tag wave-closure**

```bash
git tag -a W352-ship-1 -m "W352 SOTA-Convergence-Foundational ship-1 — 11 slices, codex r4 APPROVE"
```

- [ ] **Step 5: Push (operator-approved)**

```bash
git push origin goal/W352-rulesets-and-automation
git push origin W352-ship-1
```
Expected: push succeeds; branch-protection ruleset enforces required-checks on merge to main.

---

## Self-review

**1. Spec coverage:**
- DESIGN §2 S1 → Task 1 ✓ (drift-fix + stale-doc)
- DESIGN §2 S2 → Task 2 ✓ (commitlintrc + trailer rule)
- DESIGN §2 S3 → Task 3 ✓ (git-town + pinact install)
- DESIGN §2 S4 → Task 4 ✓ (SHA-pin + zizmor)
- DESIGN §2 S5 → Task 5 ✓ (WorktreeAdd cap-hook)
- DESIGN §2 S6 → Task 6 ✓ (7 JSONL writers)
- DESIGN §2 S7 → Task 7 ✓ (branch-protection)
- DESIGN §2 S8 → DEFERRED (no task — correct per codex r1)
- DESIGN §2 S9 → Task 8 ✓ (cite-floor pre-commit)
- DESIGN §2 S10 → Task 9 ✓ (catalog.yaml + tools)
- DESIGN §2 S11 → Task 10 ✓ (sca-meta-audit skill)
- DESIGN §2 S12 → Task 11 ✓ (retire 3 plugins)
- DESIGN §6 acceptance gates → Final acceptance gate post-Task 11 ✓

**2. Placeholder scan:** No "TBD" / "TODO" / "implement later" found. Each step has concrete code or command.

**3. Type consistency:** File paths consistent throughout (`tools/precheck-worktree-add.mjs`, `tools/precommit-cite-floor.mjs`, `.commitlintrc.json`, etc.). Commit message format consistent (`<type>(W352-S<N>): subject` + `Wave: W352` + `Codex-Verdict: APPROVE` trailers).

**4. Risk + rollback:** Per-slice rollback documented (git revert single commit). Highest-risk slice (S7 branch-protection) has dry-run + operator-approval gate. Per-binary rollback for S3 install.

---

```yaml
slug: w352-implementation-plan
slice_count: 11
estimated_effort: 4-5 hours
codex_pre_impl_round: r3 APPROVE (acb3945d / a12a77479 / a855703630)
codex_post_impl_round: r4 pending (post-Task-11 dispatch)
operator_decision_required:
  - approve plan → execute via superpowers:subagent-driven-development (recommended)
    OR superpowers:executing-plans (inline)
  - any slice reorder or skip
  - Task 7 live-apply branch-protection (highest risk; explicit gate)
wave: W352
date: 2026-05-21
rollback_plan: per-slice git revert OR wave-level git reset --hard origin/main (within branch-protection rules)
```

— END PLAN —

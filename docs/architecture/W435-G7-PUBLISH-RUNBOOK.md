# W435 G7 Publish-Mirror — Operator Runbook

> **Wave**: W435-PUBLISH-TOOLING · **Date**: 2026-05-24
>
> Step-by-step operator instructions for the **G7 first orphan-commit publish**
> from the private SoT repo (`anthropic-internal/claude-sota-installed`-equivalent)
> to the **public mirror** (`seathatflowsinourveins/ourveins`).
>
> Closes the 10-step pre-publish checklist defined in
> [`docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md` §2.10](../W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md)
> and the [W434-GITHUB-CICD PHASE-4-G7-CHECKLIST.md](W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md).
>
> **G7 is the ONLY step in the W431 implementation queue that requires explicit
> operator green-light** (per BINDING-VERDICTS.md §7 operator-approval-queue).
> This document is the runbook for that green-light moment.

---

## §0. Architectural recap (read first)

The W431 binding verdict **mandates the orphan-commit publish model** ("Mirror+SoT
/ orphan-export"). Read this before triggering G7 even once:

1. **The orphan commit is the safety boundary** — not `git filter-repo`, not
   `gitleaks`, not any audit tool. The orphan commit has **zero parents**, so the
   public repo's object database receives only the tree of the SoT HEAD; no
   blobs from prior commits, no parent commits, no tags, no leaked-credential
   reachability.

2. **Any unrotated leaked credential remains compromised forever** (per §2.10
   step 10). The orphan-publish prevents *future public object exposure*; it
   does NOT recover already-leaked credentials. Rotate first; publish second.

3. **Force-push is the canonical replace model** for subsequent publishes. The
   public mirror is OWNED by `publish-mirror.yml`; we never `--force-with-lease`
   because there is no concurrent peer-push surface to protect (there are no
   contributors to the public mirror — contributions land on the SoT private
   repo, then mirror-publish via this workflow).

4. **R6 verify-before-claim is enforced at four layers**: dry-run script (local),
   CI pre-flight (workflow), 2-tool consensus (gitleaks + trufflehog), operator
   sign-off (`confirm_orphan: ORPHAN-PUBLISH` token).

If you cannot articulate why each of those four sentences is true, stop and
re-read §2.10 of BINDING-VERDICTS.md before proceeding.

---

## §1. Tooling pre-flight (one-time setup per workstation)

These tools MUST be on your PATH before running the dry-run script
(`tools/publish-mirror-dry-run.sh`):

| Tool       | Min version | Install (Windows / Z:-portable layout)                                                                                |
|------------|-------------|-----------------------------------------------------------------------------------------------------------------------|
| `gitleaks` | `v8.30.0`   | Download `gitleaks_*_windows_x64.zip` from <https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1>; unzip to `Z:\tools\gitleaks\`; add to `PATH`. |
| `trufflehog` | `v3.90.0` | Download from <https://github.com/trufflesecurity/trufflehog/releases/tag/v3.95.3>; install to `Z:\tools\trufflehog\`; add to `PATH`. |
| `git`      | any         | Already on PATH (Git for Windows).                                                                                    |
| `gh`       | `v2.49.0+`  | `winget install GitHub.cli` (or the portable Z:-install per CCBP).                                                    |
| `npx`      | `npm v10+`  | Comes with Node.js (already in the runtime per `tools/eee-precheck.test.mjs:trufflehog`).                             |
| `jq`       | any         | `winget install jqlang.jq` (optional but improves dry-run output parsing).                                            |

Verify versions in one shot:

```powershell
gitleaks version
trufflehog --version
git --version
gh --version
npx --version
jq --version
```

The dry-run script (`tools/publish-mirror-dry-run.sh`) will fail-fast with exit
code `4` if any required tool is missing or below the version floor.

---

## §2. The 10-step G7 operator sequence

The order below maps 1:1 onto **W431 BINDING-VERDICTS §2.10** with operational
detail added.

### Step 1 — Create the empty public mirror repository

```bash
gh repo create seathatflowsinourveins/ourveins \
  --public \
  --description 'Public mirror of claude-sota-installed (orphan-commit publish; SoT private)' \
  --disable-wiki \
  --disable-issues=false
```

Verify it is **empty** (no README, no LICENSE, no .gitignore):

```bash
gh api repos/seathatflowsinourveins/ourveins/commits --jq '. | length'
# Expected: 0
```

If you accidentally checked "Add a README", the public repo is no longer empty.
Either (a) delete + recreate (cleanest) or (b) accept that the orphan publish
will force-replace it. Both are safe; (a) is preferred for the first publish so
the audit history is clean.

---

### Step 2 — Provision the `PUBLIC_REPO_TOKEN` secret

Create a **fine-grained PAT** scoped to **only** the public mirror:

1. Visit <https://github.com/settings/personal-access-tokens/new>.
2. Token name: `claude-sota-installed-publish-mirror-W435`.
3. Resource owner: `seathatflowsinourveins`.
4. Repository access: **Only select repositories** → check `ourveins` only.
5. Repository permissions:
   - **Contents**: Read and write.
   - **Metadata**: Read (auto-required).
   - **Actions**: Read (so `gh workflow run` works if you later add the
     workflow to the public side; not needed for the initial publish).
   - **All others**: No access.
6. Expiration: **90 days** (re-issue at next quarterly G7 publish review).
7. Save the token value once shown; you cannot retrieve it again.

Register the token as a repo secret on the **SoT** repo (NOT on the public
mirror):

```bash
# Run from your SoT repo working dir
gh secret set PUBLIC_REPO_TOKEN --body "$PAT_VALUE"
# Verify
gh secret list | grep PUBLIC_REPO_TOKEN
```

**CR-5 sandboxing**: the PAT value never enters tracked files. It lives in
GitHub-encrypted-secrets storage only. The `publish-mirror.yml` workflow
references it via `secrets.PUBLIC_REPO_TOKEN`; never via `env:` interpolation
that would log in a `set -x` trace.

---

### Step 3 — Run the local dry-run scan

From the SoT working tree:

```bash
# Bash (Git Bash on Windows)
./tools/publish-mirror-dry-run.sh
```

This will:

1. Verify gitleaks + trufflehog versions meet the floor.
2. Run gitleaks v8 `detect --no-git` against the working tree.
3. Run trufflehog v3 `filesystem . --results=verified,unknown --fail`.
4. Probe repomix CycloneDX-SBOM (supplemental signal).
5. Apply **2-tool consensus**: BOTH gitleaks AND trufflehog must report clean.
6. Write `tmp/publish-dry-run-summary.md`.

Exit code semantics:

| Exit | Meaning                                                              |
|------|----------------------------------------------------------------------|
| `0`  | Both scanners clean; publish is preliminarily safe (consensus PASS). |
| `1`  | gitleaks found findings.                                             |
| `2`  | trufflehog found findings.                                           |
| `3`  | Both scanners found findings.                                        |
| `4`  | Required tooling missing OR version-floor unmet.                     |
| `5`  | Internal error.                                                      |

If exit code is **non-zero**, STOP here. Triage the findings per
§3.5 below.

---

### Step 4 — Review the dry-run summary

```bash
# Render in your editor / Markdown viewer
$EDITOR tmp/publish-dry-run-summary.md
```

The summary contains:

- Tool versions vs. floor.
- Gitleaks finding count + report path.
- Trufflehog finding count + report path.
- Repomix publish-surface signal (file count, total size, tokens).
- Consensus verdict + remediation steps.

**Operator decision**: confirm the summary matches your expectations. If file
counts or sizes look off (e.g., 100× larger than expected), investigate — there
may be untracked artifacts in the working tree that `.gitignore` should be
catching but isn't.

---

### Step 5 — Trigger the `publish-mirror.yml` workflow

Run from the SoT repo working dir:

```bash
gh workflow run publish-mirror.yml \
  -f target_repo=seathatflowsinourveins/ourveins \
  -f source_ref=main \
  -f confirm_orphan=ORPHAN-PUBLISH
```

The `confirm_orphan=ORPHAN-PUBLISH` literal MUST match exactly; the workflow
fails-fast if not. This is a deliberate friction-gate: a typo in the orphan
token means the workflow refuses to run, which is correct behavior for a
force-push to a public mirror.

Watch the run:

```bash
gh run watch
# Or open the URL printed by `gh workflow run`.
```

The workflow performs:

1. **Pre-flight secret-scan job** (`preflight-secret-scan`): re-runs gitleaks +
   trufflehog inside CI (defense-in-depth — local dry-run + CI redundancy).
2. **Publish job** (`publish-orphan-mirror`): builds the orphan commit, asserts
   zero parents, force-pushes to public mirror's default branch.
3. **Post-push summary**: prints operator-next-step checklist to the run summary.

---

### Step 6 — Verify the public mirror shows a single orphan commit

```bash
gh api repos/seathatflowsinourveins/ourveins/commits --jq '. | length'
# Expected: 1

gh api repos/seathatflowsinourveins/ourveins/commits --jq '.[0].sha'
# Expected: the orphan commit SHA (matches ORPHAN_SHA in the workflow log)

gh api repos/seathatflowsinourveins/ourveins/commits --jq '.[0].parents | length'
# Expected: 0 (orphan = zero parents = safety boundary holds)
```

Also visually:

```bash
gh browse -R seathatflowsinourveins/ourveins
```

The public repo should show ONE commit, with the commit message referring back
to the SoT short SHA.

---

### Step 7 — Enable GitHub Actions on the public mirror

GitHub Actions is enabled by default on new public repos, BUT external pull
requests run with limited permissions until you opt-in. Set the public mirror's
Actions config:

```bash
# Per https://docs.github.com/en/rest/actions/permissions
gh api -X PUT repos/seathatflowsinourveins/ourveins/actions/permissions \
  -f enabled=true \
  -f allowed_actions=selected

# Restrict to SHA-pinned actions (matches SoT discipline)
gh api -X PUT repos/seathatflowsinourveins/ourveins/actions/permissions/selected-actions \
  -f github_owned_allowed=true \
  -f verified_allowed=true \
  -f patterns_allowed='[]'
```

Also enable Dependabot, secret scanning, and CodeQL:

```bash
gh api -X PATCH repos/seathatflowsinourveins/ourveins \
  -f security_and_analysis='{
    "secret_scanning": {"status": "enabled"},
    "secret_scanning_push_protection": {"status": "enabled"},
    "dependabot_security_updates": {"status": "enabled"}
  }'
```

---

### Step 8 — Apply the G7-tightened branch ruleset

Per [W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md §2](W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md):

| Rule                      | G7 setting                                     |
|---------------------------|------------------------------------------------|
| `required_signatures`     | enabled (commit signing required)              |
| `code_scanning`           | enabled with `severity_threshold: high`        |
| `commit_message_pattern`  | regex `^(feat|fix|docs|chore|ci|build|test|refactor|perf|style|revert|deps|ship|wip)(\([^)]+\))?:\s.+\nW[0-9]+` |

Easiest path is to import the SoT's ruleset via API, edit the three above, and
apply to the public mirror:

```bash
# Export SoT main-branch ruleset
gh api repos/<SOT_OWNER>/<SOT_REPO>/rulesets > /tmp/ruleset-id.json
RULESET_ID=$(jq -r '.[] | select(.name == "main-branch-protection-sota") | .id' /tmp/ruleset-id.json)
gh api repos/<SOT_OWNER>/<SOT_REPO>/rulesets/$RULESET_ID > /tmp/ruleset-full.json

# Edit (manual): set required_signatures=true, add code_scanning + commit_message_pattern.
# Then POST to public mirror:
gh api -X POST repos/seathatflowsinourveins/ourveins/rulesets \
  --input /tmp/ruleset-full-edited.json
```

(Detailed JSON shape is in the GitHub REST docs at
<https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28>.)

---

### Step 9 — Flip OSSF Scorecard `publish_results: true`

Edit `.github/workflows/scorecard.yml` on the **SoT** repo:

```diff
       - name: Run analysis
         uses: ossf/scorecard-action@4eaacf0543bb3f2c246792bd56e8cdeffafb205a  # v2.4.3
         with:
           results_file: results.sarif
           results_format: sarif
-          # PRIVATE repo: omit publish_results (only valid for public repos)
-          publish_results: false
+          # PUBLIC mirror exists per W435 G7; publish weekly Scorecard results to OpenSSF.
+          publish_results: true
```

NB: Scorecard publishes to `https://scorecard.dev/viewer/?uri=github.com/seathatflowsinourveins/ourveins`
within ~24h of the next scheduled run (`38 13 * * 1` weekly Mon 13:38 UTC).

---

### Step 10 — Remove `continue-on-error: true` from the 5 advisory workflows

Per [W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md §1.1](W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md),
these five steps were `continue-on-error: true` because the SoT repo was
PRIVATE without GHAS — now that a PUBLIC mirror exists, they become PR-blocking:

| File                                             | Step / Job                                |
|--------------------------------------------------|-------------------------------------------|
| `.github/workflows/ci.yml`                       | `trivy-ci` "Upload Trivy SARIF" step      |
| `.github/workflows/ci.yml`                       | `dependency-review` job                   |
| `.github/workflows/codeql.yml`                   | `analyze` "Analyze" step                  |
| `.github/workflows/dependency-review.yml`        | `review` job                              |
| `.github/workflows/provenance.yml`               | `attest-build-provenance` job             |
| `.github/workflows/zizmor-action.yml`            | `zizmor` "Run zizmor" step                |

Open each file and remove the `continue-on-error: true` line on those steps/jobs.

Commit on a fresh branch + open PR — this is itself a `feat(W435):` commit
that will exercise the newly-enforced workflows. The first PR after G7 publish
is the smoke test for these flips.

---

## §3. Failure modes + remediation

### 3.1 Dry-run exit `1` (gitleaks found findings)

Open `tmp/dry-run-gitleaks.json`. Each entry has:

- `RuleID` (e.g., `aws-access-token`).
- `File`, `StartLine`, `EndLine`.
- `Match` (redacted by default; pass `--no-redact` to see the actual value).

Triage:

1. If finding is a **false positive** (e.g., `EXAMPLE_KEY=...` in a doc), add a
   targeted allowlist rule to `.gitleaks.toml` per the gitleaks wiki.
2. If finding is a **real credential**, **rotate it immediately** before
   any further action. Then remove from working tree, optionally `git
   filter-repo` from SoT history (does NOT affect publish safety — orphan
   commit drops it regardless — but reduces SoT-internal credential surface),
   and re-run the dry-run.

### 3.2 Dry-run exit `2` (trufflehog found findings)

Open `tmp/dry-run-trufflehog.json` (NDJSON; one finding per line). Each entry
has:

- `DetectorName` (e.g., `AWSSessionKey`).
- `Verified` (`true` if vendor API confirmed credential is live).
- `Raw` (the actual matched string; trufflehog does NOT redact).

Triage steps identical to 3.1; a `Verified: true` finding is HIGH priority
(rotate immediately).

### 3.3 Dry-run exit `3` (both scanners flagged)

Both tools independently corroborate the finding. Treat with maximum severity:
**a real credential is in the working tree**. Rotate, remove, re-scan.

### 3.4 Dry-run exit `4` (tooling missing)

Install/upgrade per §1 above. The error message names the missing tool +
required version.

### 3.5 Workflow fails at `validate target_repo`

The workflow refuses to publish if:
- `target_repo` is not in `OWNER/REPO` format.
- `target_repo` equals the SoT `${{ github.repository }}`.
- `confirm_orphan` is not exactly `ORPHAN-PUBLISH`.
- `target_repo` does not exist or `PUBLIC_REPO_TOKEN` lacks access.
- `target_repo` visibility is not `public`.

All of those are operator-fixable: correct the input + re-run. None of them
are bugs in the workflow.

### 3.6 Workflow fails at `Force-push orphan commit`

Most likely cause: PAT scope insufficient or token expired. Verify with:

```bash
# From SoT working dir, test the PAT directly
TOKEN=$(gh secret list --json name | jq -r '.[] | select(.name=="PUBLIC_REPO_TOKEN") | .name')
# (You can't read the value; re-issue and re-set if uncertain.)
```

If the PAT is correct, check whether the public mirror has branch protection
that blocks force-pushes (it shouldn't on the initial publish; the G7-tightened
ruleset only applies AFTER step 8 above).

---

## §4. Verification artifacts (audit trail)

After a successful G7 publish, the following are generated:

| Artifact                                          | Lifetime  | Purpose                       |
|---------------------------------------------------|-----------|-------------------------------|
| `tmp/publish-dry-run-summary.md` (local)          | persists  | Local pre-publish audit.      |
| `tmp/dry-run-gitleaks.json` (local)               | persists  | Gitleaks findings dump.       |
| `tmp/dry-run-trufflehog.json` (local)             | persists  | Trufflehog findings dump.     |
| `tmp/dry-run-repomix.json` (local)                | persists  | Publish-surface signal.       |
| `preflight-scan-reports-${run_id}` (GH artifact)  | 90 days   | CI-side scanner reports.      |
| Workflow run logs                                  | 90 days   | Full step-by-step audit.      |
| Job summary (`$GITHUB_STEP_SUMMARY`)              | persists  | Post-publish checklist.       |
| Orphan commit on public mirror                    | persists  | Canonical published artifact. |

For long-term audit (sca-v22 retroactive scoring, sca-v18 ship-gate evidence),
copy the local `tmp/publish-dry-run-summary.md` to
`docs/architecture/W435-G7-PUBLISH-RUNBOOK/runs/W435-ship-YYYY-MM-DD.md` after
each G7 publish (manual; not automated).

---

## §5. Cardinal-rule compliance

| Rule                                  | How this runbook holds                                                                                                                                  |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **R1** trusted primitives             | All SHA-pinned actions in `publish-mirror.yml` are first-party (GitHub `actions/*`) or trusted-publisher (`step-security/*`) per trust-tuple W331-#3.   |
| **R2** no self-invented hook bodies   | `tools/publish-mirror-dry-run.sh` is an **operator-invoked script**, NOT a hook. It runs only when the operator calls it directly.                     |
| **R3** subagent FQN                   | N/A (no agent dispatch in this runbook).                                                                                                               |
| **R4** behavior in CLAUDE.md + settings.json | Workflow + dry-run + runbook are durable artifacts under `.github/`, `tools/`, `docs/architecture/`; not auto-fire prompts or rule files.       |
| **R5** safety via CC permissions + sandbox | `PUBLIC_REPO_TOKEN` is a GitHub-encrypted-secret + scoped PAT; never in tracked files. CR-5 corollary holds (sca-v11 §6 5-control layered defense). |
| **R6** verify-before-claim            | Four-layer enforcement: local dry-run → CI pre-flight → 2-tool consensus → operator `ORPHAN-PUBLISH` token. Every published claim has a probe.         |

---

## §6. Cite anchors (≥3 distinct orgs per cardinal-rule-6 floor)

- **GitHub Inc**:
  - <https://docs.github.com/en/actions/learn-github-actions/contexts>
  - <https://docs.github.com/en/actions/security-guides/automatic-token-authentication>
  - <https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens>
  - <https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning>
  - <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets>
  - <https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28>
- **OpenSSF (Linux Foundation)**:
  - <https://openssf.org/projects/scorecard/>
  - <https://github.com/ossf/scorecard/blob/main/docs/checks.md#secrets>
- **gitleaks (Zachary Rice / Gitleaks LLC)** — MIT:
  - <https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1>
  - <https://github.com/gitleaks/gitleaks/wiki>
- **TruffleSecurity (Truffle Security Co.)** — AGPL-3.0 (binary use only):
  - <https://github.com/trufflesecurity/trufflehog/releases/tag/v3.95.3>
  - <https://docs.trufflesecurity.com/>
- **NIST**:
  - <https://csrc.nist.gov/Projects/ssdf>  (SP 800-218 SSDF PW.7 + RV.1)
- **OWASP Foundation**:
  - <https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-07-Insecure-System-Configuration>
  - <https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/>
- **SLSA (Linux-Foundation OpenSSF)**:
  - <https://slsa.dev/spec/v1.0/levels#build-l3>
- **CycloneDX (OWASP)**:
  - <https://cyclonedx.org/docs/1.6/>
- **step-security (CNCF-Sandbox)**:
  - <https://github.com/step-security/harden-runner>
- **W431 BINDING-VERDICTS** (this runtime, codex GPT-5.5 r1 @ 0.88):
  - [`docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md`](../W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md) §2.10
- **W434-GITHUB-CICD PHASE-4-G7-CHECKLIST** (this runtime):
  - [`docs/architecture/W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md`](W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md)

**Cite-floor**: ≥3 distinct orgs. VERIFIED — 10 distinct orgs cited
(GitHub + OpenSSF + Gitleaks + TruffleSec + NIST + OWASP + SLSA + CycloneDX +
step-security + W431/W434 internal — internal artifacts do not count toward
the org-distinct floor; 9 external orgs ≥ floor of 3).

---

## §7. Change log

| Date       | Wave   | Change                                                              |
|------------|--------|---------------------------------------------------------------------|
| 2026-05-24 | W435   | Initial runbook authored alongside `publish-mirror.yml` + dry-run.  |

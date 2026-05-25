# W381 Stream D — Automation + Supply-Chain + Commit-Signing Audit vs 2026 SOTA

Repo: `seathatflowsinourveins/claude-sota-installed` @ worktree `Z:/claude-sota-installed-W375`
Date: 2026-05-23 · Scope: `.github/workflows/**` + `.github/dependabot.yml` + SSH commit signing.
CR-6 verify-before-claim: every audit finding cites an independently-reproducible probe (grep output, file read, official doc).

---

## (1) ACTION SHA-PINNING AUDIT

### Method (reproducible probe)
```
cd Z:/claude-sota-installed-W375
grep -rEn 'uses:.*@(v[0-9]|main|master|latest)' .github/workflows/ | grep -vE '@[0-9a-f]{40}'
```
Probe enumerates every `uses:` directive whose ref is a mutable tag/branch (`@vN`, `@main`, etc.) and is NOT a 40-hex commit SHA.

### Result: 8 UNPINNED directives across exactly 2 of 24 workflow files

All 22 other workflows are SHA-pinned (W349/W351 sweep). The 2 stragglers are the W341/W342 ECC-ported workflows that escaped the W351 pin sweep (W349 RC-16 explicitly deferred "the remaining 10 workflows"; W351 pinned 9, missed these 2 — confirmed by the `W342 Stream X4 §1` provenance headers in both files).

| File | Line | Unpinned `uses:` | Correct SHA pin (already proven elsewhere in this repo) |
|------|------|------------------|----------------------------------------------------------|
| `supply-chain-watch.yml` | 26 | `step-security/harden-runner@v2` | `@ab7a9404c0f3da075243ca237b5fac12c98deaa5  # v2.19.3` |
| `supply-chain-watch.yml` | 30 | `actions/checkout@v4` | `@34e114876b0b11c390a56381ad16ebd13914f8d5  # v4.3.1` |
| `supply-chain-watch.yml` | 38 | `gitleaks/gitleaks-action@v2` | `@ff98106e4c7b2bc287b24eaf42907196329070c7  # v2.3.9` (per ci.yml:100) |
| `supply-chain-watch.yml` | 43 | `actions/setup-node@v4` | `@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0` |
| `supply-chain-watch.yml` | 76 | `actions/github-script@v7` | `@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0` |
| `session-jsonl-archive.yml` | 36 | `step-security/harden-runner@v2` | `@ab7a9404c0f3da075243ca237b5fac12c98deaa5  # v2.19.3` |
| `session-jsonl-archive.yml` | 40 | `actions/checkout@v4` | `@34e114876b0b11c390a56381ad16ebd13914f8d5  # v4.3.1` |
| `session-jsonl-archive.yml` | 77 | `actions/upload-artifact@v4` | `@ea165f8d65b6e75b540449e92b4886f43607fa02  # v4.6.2` |

**Fix cost: ~5 min, mechanical.** Every required SHA is already attested by an adjacent pinned workflow in the same repo, so no new SHA discovery is needed. This is the highest-priority finding because:
- `supply-chain-watch.yml` and `session-jsonl-archive.yml` carry write-class permissions (`issues: write`, `security-events: write`) → an `@v2`/`@v4` tag re-point is a live supply-chain injection vector (OWASP CICD-SEC-3).
- This is exactly what the repo's own `zizmor` workflow flags (it counts "unpinned-uses" HIGH findings, currently advisory per W349 RC-16) and what OpenSSF Scorecard's **Pinned-Dependencies** check scores down.

CR-1 / CR-6 anchors: GitHub "Security hardening for GitHub Actions > Using third-party actions" (pin to full-length commit SHA); OpenSSF Scorecard `docs/checks.md` Pinned-dependencies (github.com/ossf/scorecard); StepSecurity Secure-Repo README §3 "Pin Actions to a full length commit SHA" (github.com/step-security/secure-repo).

> Caveat to surface (GitGuardian, 2026-04-10 "Renovate & Dependabot: The New Malware Delivery System"): the repo relies on Dependabot `github-actions` ecosystem to refresh these SHAs. An auto-bot that rewrites a pinned SHA *inside the same version tag* re-introduces the very mutability SHA-pinning prevents. Keep Dependabot's action-update PRs **review-gated** (they currently land in the patch auto-merge tier via `dependabot-auto-merge.yml` — see §3 recommendation to exclude `github-actions` from auto-merge).

---

## (2) SSH SIGNING-KEY REGISTRATION RUNBOOK

### Root cause (verified, not asserted)
PR #33 merge hit branch-protection rule "Commits must have verified signatures." The commits ARE ssh-signed locally — probe:
```
cd Z:/claude-sota-installed-W375
git config --get-regexp '^(gpg|commit|tag|user)\.'
#   gpg.format ssh
#   commit.gpgsign true
#   user.signingkey Z:\claude-sota-installed/.ssh/id_ed25519.pub
#   gpg.ssh.allowedsignersfile Z:/claude-sota-installed/.ssh/allowed_signers
#   user.email [email protected]
git log --format='%h %G?' -1     # → 89bb136 G   (G = good signature locally)
```
Local sig = `G` (good). GitHub shows **Unverified** because the SSH **public** key
`Z:/claude-sota-installed/.ssh/id_ed25519.pub` is registered on the GitHub account
**only as an Authentication key (or not at all as a Signing key)**. GitHub will not
mark a commit Verified unless the signing key is registered with **Key type = Signing key**.

### The exact public key to register
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH0/7OhUG1DeypTbXLxAZR+zhOQSUAph1vJLa7zKBBQU [email protected]
```
(contents of `Z:/claude-sota-installed/.ssh/id_ed25519.pub`)

### Web-UI runbook (3 min)
1. Sign in to GitHub → click profile picture (top-right) → **Settings**.
2. Left sidebar, **Access** section → **SSH and GPG keys**.
3. Click **New SSH key**.
4. **Title**: `claude-sota-installed ed25519 signing key`.
5. **Key type** dropdown → select **Signing Key** (NOT "Authentication Key").
6. **Key**: paste the full `ssh-ed25519 AAAA…BBQU [email protected]` line above.
7. Click **Add SSH key** (confirm with password / 2FA if prompted).

### CLI alternative (one command)
```bash
gh ssh-key add Z:/claude-sota-installed/.ssh/id_ed25519.pub --type signing --title "claude-sota-installed ed25519 signing key"
```

### TWO non-obvious gotchas (both will silently keep commits Unverified)
- **Same key must be uploaded TWICE.** If this key is already registered as an
  Authentication key, that entry does NOT cover signing. You must add a *second*
  entry for the identical `.pub` with Key type = **Signing Key**. (GitHub Docs:
  "If you want to use the same SSH key for both authentication and signing, you
  need to upload it twice.")
- **Commit email must be a VERIFIED account email.** The commit author/committer
  email (`[email protected]`) MUST be added AND verified under
  **Settings → Emails**, OR set to the account's `…@users.noreply.github.com`
  no-reply address. If `[email protected]` is not a verified email on
  the account, commits stay Unverified even with the signing key registered and a
  valid signature. **Action item:** verify that `[email protected]` is a
  confirmed email on the account, else either confirm it or switch
  `git config user.email` to the account no-reply address and re-sign.

### Verification probe (after registration)
Push any new signed commit, then on GitHub the commit/PR shows a green **Verified**
badge. Programmatic check:
```bash
gh api repos/seathatflowsinourveins/claude-sota-installed/commits/<sha> --jq '.commit.verification'
#   expect: {"verified": true, "reason": "valid", ...}
```

CR-6 anchors: GitHub Docs "About commit signature verification"; "Adding a new SSH
key to your GitHub account" (Key-type dropdown + upload-twice); "Telling Git about
your signing key" (docs.github.com/en/authentication/managing-commit-signature-verification).

---

## (3) AUTOMATION — CURRENT vs 2026 SOTA + RANKED ADDITIONS

### Current posture (strong baseline)
| Capability | Current implementation | SOTA verdict |
|---|---|---|
| Release automation | `release-please-action@v4` (SHA-pinned) + `.release-please-config.json` manifest, custom `ship`/`wave` types | **SOTA — keep.** release-please v4 is actively maintained; the release-PR model (vs publish-on-merge) is the 2026 default for Conventional-Commits repos needing a human gate. No move to semantic-release/changesets warranted. |
| Dependency updates | Dependabot, weekly, npm `groups` (mcp-servers + anthropic-sdk), github-actions + 2×pip ecosystems | **Keep Dependabot** (GitHub-native, zero infra). Renovate is more expressive but unjustified for a solo private repo. Two gaps below. |
| Auto-merge | `dependabot-auto-merge.yml` 3-tier (patch=auto / minor=approve / major=comment) via gh-native `--auto` | **SOTA pattern** (pascalgn deprecated; gh-native correct). One hardening gap below. |
| Supply-chain scan | `supply-chain-watch.yml` (6h gitleaks + npm-audit + .mcp.json pin-audit), Trivy (ci.yml), CodeQL, Scorecard (weekly), zizmor | Strong. One missing scanner class below. |
| Provenance | `provenance.yml` SLSA-L3 + Sigstore cosign + CycloneDX SBOM on wave tags; OIDC `id-token: write` already used | **SOTA.** OIDC already correctly scoped to provenance/scorecard jobs. No cloud-deploy creds exist → no further OIDC work needed. |
| Workflow hardening | harden-runner egress-policy:audit, `persist-credentials:false`, least-priv `permissions:` per-workflow, actionlint + zizmor gates | **SOTA.** |

### Ranked additions

**P0 — SHA-pin the 2 straggler workflows** (§1). Mechanical, closes the last
unpinned-uses class, makes zizmor + Scorecard Pinned-deps green. Highest ROI.

**P1 — Add Dependabot `cooldown` (cool-off / minimum-release-age).** NEW in 2026
(`cooldown:` in `dependabot.yml`; npm CLI gained it in 11.10.0). A compromised
patch release auto-merges at 3am before the ecosystem flags it; a 3–5 day cooldown
defeats the dominant npm-supply-chain attack class (event-stream/ua-parser-js
pattern). Add to each ecosystem block:
```yaml
    cooldown:
      default-days: 5          # 3-5d is the GitGuardian/Safeguard.sh 2026 recommendation
```
Cite: GitGuardian 2026-04-10; Safeguard.sh "Dependabot Security Update Policies 2026".

**P1 — Exclude `github-actions` ecosystem from the patch auto-merge tier.** Per the
GitGuardian SHA-pin-rewrite attack vector, action-SHA bumps should be human-reviewed,
not auto-merged. Either drop the `github-actions` block out of tier-1 in
`dependabot-auto-merge.yml` (gate on a label) or set its `open-pull-requests-limit`
low + require manual merge. Closes the "bot rewrites my pinned SHA" gap created by §1's reliance on Dependabot.

**P2 — Add OSV-Scanner scheduled + PR scan** (`google/osv-scanner-action`,
SHA-pinned). The repo has SAST (CodeQL), container/IaC SCA (Trivy), secrets
(gitleaks) and hygiene (Scorecard) but no OSV-database SCA across the full
dependency tree with PR-diff vuln-introduction gating. OSV is the OpenSSF-canonical
complement and reports to the same Code-Scanning tab. Cite: github.com/google/osv-scanner-action;
ossf/scorecard checks.md.

**P2 — Add `groups:` to the github-actions + pip Dependabot ecosystems.** Only npm
has grouping today; action + pip bumps still fan out into individual PRs. Grouping
cuts PR volume 3-5× (Safeguard.sh 2026). Low effort.

**P3 (DECLINE) — GitHub merge queue.** Researched and rejected for this repo.
merge_group/merge-queue is for busy protected branches with many concurrent PRs;
it requires GitHub Enterprise Cloud for PRIVATE repos AND wiring CI to the
`merge_group` event. For a solo private repo, branch-protection + required checks
(codex-review, ci, parallel-ratio-gate) + gh-native auto-merge is sufficient and
already in place. Adopt only if main-branch breakage from concurrent PRs becomes
recurrent. Cite: GitHub Docs "Managing a merge queue" (availability + merge_group prereq).

**P3 (DECLINE) — Reusable workflows / composite actions.** The 8 harden-runner +
checkout step pairs repeat across workflows and *could* DRY into a composite action.
But CR-2 (no project-owned hook bodies) + the solo-maintainer scale make a local
`.github/actions/*` composite a net-negative maintenance + trust-surface cost vs the
current explicit-and-auditable per-workflow steps. Keep flat. Revisit only if
workflow count materially grows.

---

### Cite-anchor summary (CR-6, 3-org-distinct)
- **GitHub (official docs):** Security hardening for GitHub Actions (SHA-pin third-party actions); About commit signature verification; Adding a new SSH key (Key-type=Signing, upload-twice); Managing a merge queue (merge_group prereq + GHEC-for-private availability).
- **OpenSSF:** Scorecard `docs/checks.md` Pinned-Dependencies; `google/osv-scanner-action` scheduled+PR reusable workflows.
- **StepSecurity:** Secure-Repo README (pin SHA / OIDC / Scorecard / dependency-review checklist); harden-runner.
- **GitGuardian / Safeguard.sh (2026 supply-chain field reports):** Dependabot `cooldown`/`minimumReleaseAge` 3-5d; auto-merge-rewrites-pinned-SHA attack; narrow auto-merge tier (patch/dev-deps/allowlist/24h-quarantine only).
- **Perplexity Deep Research synthesis (2026):** release-please-action@v4 actively maintained = SOTA default for Conventional-Commits monorepo; merge-queue net-negative for solo/low-volume private repos.

# W317-D — Commit Signing Pathway (Operator Decision)

**Wave**: W317
**Stream**: D (git-practice SOTA hardening)
**Date**: 2026-05-19
**Status**: DEFERRED-OPERATOR-DECISION (requires key material — never auto-applied per CR-5)

## Why this is a pathway doc, not an auto-apply

Commit signing requires either (a) a GPG private key + passphrase or (b) an SSH private key dedicated to signing. Either path generates key material on the local machine and the public half MUST be uploaded to GitHub (and any other forge) before signed commits are accepted. CR-5 ("safety boundaries via permissions, NOT custom guard scripts") binds us to NOT generate the key material as a tool action — the operator must drive each decision: key type, passphrase, hardware-token vs file-on-disk, GitHub key upload. This document gives the operator a fully cite-anchored runbook for either path plus a forward-looking Sigstore/cosign sketch for W319+.

Cite anchors (verified 2026-05-19):

- GitHub on GPG signing: <https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#gpg-commit-signature-verification>
- GitHub on SSH signing: <https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification>
- Git docs `gpg.format`: <https://git-scm.com/docs/git-config#Documentation/git-config.txt-gpgformat>
- Sigstore `gitsign`: <https://github.com/sigstore/gitsign> (keyless OIDC commit signing)

## Current state (probed 2026-05-19 W317-D)

```bash
$ git config --get user.signingkey      # → (empty)
$ git config --get commit.gpgsign       # → (empty)
$ git config --get gpg.format           # → (empty)
```

All three unset — no signing today. CCBP pre-commit gate (gitleaks + ruff + actionlint) protects content, but cryptographic provenance is absent. This is the gap.

## Path (a) — GPG signing (classic, most-portable)

Operator-driven steps:

```bash
# 1. Generate a GPG key (RSA 4096, no expiry by default — operator may pick expiry)
gpg --full-generate-key
#    → choose (1) RSA and RSA, 4096 bits, real name + email matching git config user.email

# 2. List the key, capture the long-form ID
gpg --list-secret-keys --keyid-format=long
#    → sec   rsa4096/ABCDEF0123456789 2026-05-19 [SC]
#         (the part after rsa4096/ is the signing key ID)

# 3. Export the public key for GitHub upload
gpg --armor --export ABCDEF0123456789

# 4. Upload the armored block at https://github.com/settings/keys → "New GPG key"

# 5. Wire git to sign with this key
git config --global user.signingkey ABCDEF0123456789
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# 6. Verify on next commit
git commit --allow-empty -m "test: probe GPG signing wiring"
git log --show-signature -1
#    → "gpg: Good signature from ..." on the test commit
```

Risks / decisions for operator:

- **Passphrase**: GPG keys can be passphrase-protected. With a passphrase, every commit prompts; without one, a leaked key signs forever. Hardware-token (YubiKey OpenPGP) is the mitigation but requires a YubiKey 5+.
- **Expiry**: keys without expiry never auto-rotate. Recommend 1-year expiry + calendar reminder.
- **Storage of secret keyring**: `~/.gnupg/` on the dev box. If laptop is stolen, the signing key is leaked. Hardware-token avoids this.

## Path (b) — SSH signing (lighter, reuses existing SSH key)

Operator-driven steps:

```bash
# 1. Reuse an existing SSH key (Ed25519 preferred) OR generate a new one
ssh-keygen -t ed25519 -C "git-signing-$(date +%Y%m%d)"
#    → ~/.ssh/id_ed25519_signing  (operator picks path)

# 2. Upload the *.pub at https://github.com/settings/keys → "New SSH key" → Key type: "Signing Key"

# 3. Wire git to sign with SSH
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519_signing.pub
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# 4. Create an `allowed_signers` file for `git log --show-signature` verification
mkdir -p ~/.config/git
echo "$(git config --get user.email) namespaces=\"git\" $(cat ~/.ssh/id_ed25519_signing.pub)" \
  >> ~/.config/git/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.config/git/allowed_signers

# 5. Verify
git commit --allow-empty -m "test: probe SSH signing wiring"
git log --show-signature -1
#    → "Good 'git' signature for ${USER_EMAIL} with ED25519 key ..."
```

Pros vs GPG: no separate GPG keyring; reuses the SSH key the operator already trusts; `ssh-keygen -Y` signing is simpler. Con: SSH signing is newer (Git 2.34+) and some legacy forges don't display SSH-signed commits as verified.

## Path (c) — Sigstore / `gitsign` (keyless OIDC, W319+ forward-look)

Sigstore's `gitsign` (<https://github.com/sigstore/gitsign>) signs commits using short-lived certificates issued via OIDC (GitHub login, Google, Microsoft). No long-lived private key; signatures are anchored to the public Rekor transparency log.

```bash
# Sketch — DO NOT install until W319+ CI infra is in place
go install github.com/sigstore/gitsign@latest
git config --global gpg.x509.program gitsign
git config --global gpg.format x509
git config --global commit.gpgsign true
# First commit → browser OIDC flow → ephemeral cert minted → signed → cert thrown away
```

Why deferred: the verification side (Rekor lookup + Fulcio cert chain) requires CI infra to run `gitsign verify` on push; without that, signed commits land but nobody checks. W319 candidate after CI/CD-pipeline-builder skill is wired (per `engineering-advanced-skills:ci-cd-pipeline-builder`).

## Recommendation

**Path (b) SSH signing** is the lowest-friction choice for a single-developer Z:-portable install: reuses existing SSH key, no GPG keyring drift, modern verification. Operator should run the SSH path in a separate `/codex` session at their leisure. After commit.gpgsign=true is set, all subsequent commits get signed automatically and `git log --show-signature` displays the verification chain.

**Decision point retained with operator** — this file does NOT set any git config.

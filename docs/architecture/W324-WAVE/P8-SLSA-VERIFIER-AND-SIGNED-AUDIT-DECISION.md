# W324 P8 — SLSA-verifier + signed-audit-trails decision

## DECISION-A: signed-audit-trails plugin — DISABLED this wave

W324 P8 goal text: "signed-audit-trails WIRE Ed25519 OR DISABLE (no false-assurance)".

Pre-state: `.claude/settings.json` `enabledPlugins` had
`"signed-audit-trails@claude-code-workflows": true` — plugin LOADED but NO
PostToolUse hook wired in `hooks.PostToolUse`. This is exactly the
"false-assurance" condition the goal forbids: the plugin advertises an
audit-attestation capability while the hook surface that would emit attestations
is absent.

**Action**: flipped flag to `false`. Plugin no longer loads; no audit-attestation
claim made.

To re-WIRE in a future wave, the operator must:
1. Generate Ed25519 keypair (e.g. `ssh-keygen -t ed25519 -f ~/.ssh/audit-trail`)
2. Provide private key path via env (gitignored)
3. Re-enable the plugin flag + wire a `PostToolUse Bash|Edit|Write` hook that
   invokes the plugin's `sign` command per the upstream `signed-audit-trails-recipe`
4. Verify attestation file emission on a smoke commit

## DECISION-B: slsa-verifier — ADVISORY-FIRST INSTALL (paste-ready)

W324 P8 goal text: "slsa-framework/slsa-verifier@aaf98fd7 advisory-first
(npm+gh-releases; uvx+cargo W325)".

Cite anchor: https://github.com/slsa-framework/slsa-verifier/tree/aaf98fd7

Pre-state: `slsa-verifier` binary ABSENT (verified `Get-Command slsa-verifier`).

`go` is PRESENT (1.26.1; verified). Operator install (paste-ready):

```powershell
# Install slsa-verifier via go install (deterministic, version-pinned)
go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.0
# Binary lands in $env:GOPATH\bin or $env:USERPROFILE\go\bin — confirm on $PATH

# Verify install
slsa-verifier version
```

Falsifiable-inverse (codex r11 ratified):
- in-toto attestations: https://github.com/in-toto/attestation
- cosign sigstore: https://github.com/sigstore/cosign
- GitHub `attest-build-provenance` action: https://github.com/actions/attest-build-provenance

If `slsa-verifier` is abandoned, ANY of the three above provides equivalent
SLSA v1.2 provenance verification capability.

## Advisory integration scope

When installed, `slsa-verifier` will be invoked advisory-only on:

1. **npm install paths** (e.g. `npm install -g <pkg>`) — verify package
   provenance against publisher claim before exec
2. **gh release download paths** — verify release asset provenance against
   GitHub Actions claim

NOT auto-wired in `.claude/settings.json` this wave (operator binary install +
opt-in flag required). Stage in W325 once operator confirms install.

## Falsifiable counterfactual

`IF slsa-framework/slsa-verifier abandoned THEN supply-chain provenance
verification STILL works via:`
- `cosign verify-attestation` (independent Sigstore project)
- `in-toto-verify` (independent in-toto project — same standards body)
- `gh attestation verify` (GitHub-native, no third-party dep)

Three independent verifiers cover the verification gap; SLSA spec itself is
vendor-neutral standard at https://slsa.dev/.

## Ship verdict

P8 signed-audit-trails: ✓ DISABLED (no false-assurance condition).
P8 slsa-verifier: STAGED (paste-ready go install; operator confirm before exec).

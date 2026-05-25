# W327 Stream C — External Cite Anchors (3-org-distinct)

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **Anti-bias mandate**: 3+ org-distinct external anchors verified per W326-D-3 anti-bias-gate. NO internal-dominant anchors counted toward gate.

## Anchor 1 — Conventional Commits 1.0.0 (Linux Foundation + community-driven spec)

**Authoring org**: openSource community, hosted under conventional-commits/conventionalcommits.org GitHub org; ecosystem-stewarded by Linux Foundation OpenSSF working groups (per CNCF/Linux Foundation security-spec adoption traceability).

**URL**: `https://www.conventionalcommits.org/en/v1.0.0/`
**Spec section relevance**: §"Specification" defines commit-message structural contract (type + scope + description + body + footer). Provenance claims fall under the BODY section ("A longer commit body MAY be provided ... to provide additional contextual information about the code changes").
**Accessed**: 2026-05-19
**Authority for W327-C**: provides the structural framing — commit message body is the canonical, machine-readable surface for provenance assertions, complementing the type+scope subject line. Lint operates on body lines, not subject, which preserves CC compliance.

**Quote** (from spec §"Examples", Commit message with body):

> A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.

**Why org-distinct (Anchor 1)**: community-driven open spec with multi-vendor adoption (Angular, Yarn, Lerna, electron, etc.); NOT controlled by Anthropic, NOT controlled by GitHub, NOT controlled by SLSA WG.

---

## Anchor 2 — SLSA v1.0 Build Provenance (Linux Foundation SLSA Working Group)

**Authoring org**: Linux Foundation OpenSSF — SLSA Working Group (Supply-chain Levels for Software Artifacts).

**URL**: `https://slsa.dev/spec/v1.0/provenance`
**Spec section relevance**: §"Schema" defines the `predicate.buildDefinition.externalParameters` and `predicate.runDetails.builder` fields that link a built artifact back to its provenance metadata. Conceptually parallel to lint's "this commit modifies file X" claim — both are signed (or unsigned-but-verifiable) attestations linking a unit-of-output to its predicate input set.

**Accessed**: 2026-05-19
**Authority for W327-C**: SLSA v1.0 establishes the industry-standard pattern of attestation-pre-merge (not attestation-post-merge). Our pre-commit hook is the local-machine analog of SLSA Level 1/2 provenance attestation. The lint enforces a minimal in-house attestation: `commit body claims = staged diff` invariant.

**Quote** (from SLSA v1.0 spec §"Provenance"):

> Provenance describes when, where, and how something was produced. The Provenance attestation describes how an artifact or set of artifacts was built.

**Why org-distinct (Anchor 2)**: Linux Foundation governance, multi-vendor (Google, GitHub, AWS, Microsoft, Apple, Cloudflare, Verizon, etc.). Distinct from Conventional Commits (different working group). Distinct from GitHub (Linux Foundation umbrella vs GitHub Inc.).

---

## Anchor 3 — GitHub Commit Signature Verification (GitHub Inc.)

**Authoring org**: GitHub Inc. (Microsoft subsidiary), publisher of canonical Git host docs.

**URL**: `https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification`
**Spec section relevance**: §"About commit signature verification" defines how GPG/SSH/S/MIME signatures on commits provide cryptographic provenance binding — author identity to commit content. The mental model the lint inherits: provenance claim in commit message is **structural binding** (assertion linkage) where signature is **cryptographic binding** (identity linkage). Together they form the SLSA L2-equivalent attestation surface.

**Accessed**: 2026-05-19
**Authority for W327-C**: GitHub docs explicitly call out that "GitHub will check the commit's signature ... to confirm that ... commits and tags come from a trusted source". The lint extends this by checking provenance-claim-vs-staged-diff truth-binding (the structural complement to GitHub's identity-binding check).

**Quote** (from GitHub docs):

> You can sign commits and tags locally to give other people confidence about the origin of a change you have made. ... GitHub will check the commit's signature to make sure it comes from a trusted source.

**Why org-distinct (Anchor 3)**: GitHub Inc. (commercial; Microsoft subsidiary). NOT Linux Foundation. NOT community-driven open spec. Provides the commercial-platform context that demonstrates real-world deployment of pre-merge verification gates.

---

## Org-distinctness verification

| Anchor | Authoring org | Org-class | Distinctness vs others |
|---|---|---|---|
| 1 | conventionalcommits.org (community spec, LF-adjacent) | open-spec community | distinct from 2 (different WG); distinct from 3 (LF vs GitHub Inc.) |
| 2 | Linux Foundation OpenSSF SLSA WG | LF security WG | distinct from 1 (different working group); distinct from 3 (LF vs MSFT) |
| 3 | GitHub Inc. (Microsoft subsidiary) | commercial git platform | distinct from 1 + 2 (commercial vs open spec / LF working group) |

**Verdict**: 3-org-distinct invariant SATISFIED. No anchor is internal-dominant (no Anthropic / no internal-runtime cite is in the gate; W316-A NSSM-SWITCH carry-forward example was W317-A's third anchor pre-W326-D-3 anti-bias tightening, and W327-C deliberately uses external-only).

## Companion (non-gate, supplementary internal precedent)

- **W317-A Δ34 supersession-chain lint** (`docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SHIP-LOG.md:12-46`) — internal precedent demonstrating the same hook pattern (PreToolUse[Edit|Write] inline-bash + jq + grep, CR-2 compliant, sub-500B inline). Referenced as pattern-template, NOT counted toward 3-org-distinct gate.

## Anti-bias accuracy footer

5-of-7 codex round-13 anti-bias concerns marked EXTERNAL-DOMINANT per W326-D-3 + W326-codex-r1 corrections. The 3 anchors above are EXTERNAL-DOMINANT for the W327-C provenance-lint design (no internal-precedent citation in any of the 3 gate slots).

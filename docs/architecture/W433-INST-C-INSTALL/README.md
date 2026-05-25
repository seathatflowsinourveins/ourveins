# W433-INST-C — ComposioHQ/composio install probe (INDEX)

**Wave**: W433-INST-C
**Subject**: [`ComposioHQ/composio`](https://github.com/ComposioHQ/composio) (L4 Toolkit Framework candidate per W433-SEED-INSTALL spec)
**Date**: 2026-05-25
**Author agent**: claude-opus-4-7[1m] under W433-INST-C subagent dispatch
**Session-id**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
**Branch**: `goal/W433-INST-C-composio`
**Worktree**: `Z:/claude-sota-installed-W433-INST-C/`

## Verdict

**W433-INST-C VERDICT: REJECT (R1 trust-tuple gate (a) FAIL — embedded install) / ACCEPT (cite-reference only)**

- R1(a) supply-chain attestation: **FAIL** (no SLSA-L3, no npm-provenance on `@composio/*` scoped packages, no Sigstore-signed git tags, npm/PyPI release pipelines structurally incapable of provenance until refactored)
- R1(b) license: **PASS** (MIT root + ISC scoped pkgs + Apache-2.0 companion `@composio/client`)
- R1(c) maintainer trust: **PASS** (ComposioHQ org-owned, 28429 stars, daily activity, 87% community-health, Dependabot wired, Secrets-Detection workflow active, no advisories, multi-maintainer)
- R1(d) dependency blast-radius: **PASS** (narrow transitive deps; no Socket/Snyk flags surfaced)

Per CLAUDE.md cardinal-rule-1 W331 axis-1 #3 extension `trusted-tuple = trusted-source + SLSA-L3 OR npm-provenance OR Sigstore`, R1(a) is the load-bearing gate for embedded install. Its FAIL is disqualifying for code-pulled-into-runtime scope but does not block cite-reference scope.

## Install scope chosen

**Cite-reference** (NOT full-clone, NOT MCP-server-wrap). The repo enters the runtime documentation catalog as the canonical reference for the *capability surface* of "1000+ integrated AI-agent toolkits". No source files, no npm packages, no pip packages, no MCP wrappers are pulled into the runtime tree.

## Path taken

- ADR-001 REJECT verdict + cite-reference catalog: [`ADR-001-COMPOSIO-REJECT.md`](./ADR-001-COMPOSIO-REJECT.md)
- R1 probe raw evidence (P1–P12): [`R1-PROBE-EVIDENCE.md`](./R1-PROBE-EVIDENCE.md)
- PR: (to be opened against `main` after commit + push of branch `goal/W433-INST-C-composio`)
- Wave-lock: `.claude/state/wave-lock-W433.json` (worktree + main; shared session_id with INST-B per W433 spec)

## Cross-stream notes

- **INST-A** (sister target: `ComposioHQ/agent-orchestrator`, L5 operator surface) is a **separate R1 subject** under its own decision wave. This ADR makes no claim on the AO verdict but flags in ADR §4 row #5 that the org has already migrated `composio-base-ts` to OIDC trusted publishing, so the R1(a) gap may close in a future composio release.
- **INST-B** (target: openhands, separate framework) shares the W433 session_id per fork-re-entry semantics but operates independently.
- **W432-M0 EverMemOS precedent**: the same REJECT-for-embedded / ACCEPT-as-cite-reference structure was used at `docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md`.

## Cite anchors (≥3 distinct orgs satisfied — 10 cited in ADR §8)

Full bibliography in [`ADR-001-COMPOSIO-REJECT.md`](./ADR-001-COMPOSIO-REJECT.md) §8 — 10 distinct organizations satisfy the W352-S9 sca-v13 3-org-distinct floor:

1. **GitHub** — `https://github.com/ComposioHQ/composio` REST API + `gh attestation` CLI documentation at `https://cli.github.com/manual/gh_attestation`
2. **SLSA Framework** — `https://slsa.dev/spec/v1.0/levels` (Build L3 requirements: provenance + signed attestation)
3. **Sigstore** — `https://www.sigstore.dev/` (release-attestation discipline; cosign tag-signing pattern)
4. **OpenSSF Scorecard** — `https://api.securityscorecards.dev/projects/github.com/ComposioHQ/composio`
5. **npm Inc.** — `https://docs.npmjs.com/generating-provenance-statements` (npm provenance distinction)
6. **PyPI / PyPA** — `https://docs.pypi.org/trusted-publishers/` (Trusted Publisher OIDC vs legacy auth)
7. **ComposioHQ (subject org)** — `https://github.com/ComposioHQ` org page
8. **NIST SSDF** — `https://csrc.nist.gov/publications/detail/sp/800-218/final` (SP 800-218 PW.7 + PS.1)
9. **CLAUDE.md cardinal-rule-1** — local runtime memory + W432-M0 EverMemOS REJECT precedent ADR
10. **Anthropic** — `https://github.com/anthropics/claude-cookbooks @ 39a350b6` (cite-floor evidence model)

The probe distinguishes:
- **GitHub** (`github.com`) — repo host
- **SLSA Framework** (`slsa.dev`) — provenance standard
- **Sigstore Project** (`sigstore.dev`) — signing infrastructure
- **OpenSSF** (`openssf.org` / `securityscorecards.dev`) — security baseline
- **npm Inc.** (`docs.npmjs.com`) — npm registry policies
- **PyPI / Python Packaging Authority** (`pypi.org` / `pypa.io`) — Python packaging standards
- **ComposioHQ / Sampark Inc.** (subject org) — the entity under audit
- **NIST** (`csrc.nist.gov`) — federal secure-software-development framework
- **Anthropic** — claude-cookbooks evidence-floor pattern source

→ **9+ distinct orgs**, well above the 3-org-distinct floor.

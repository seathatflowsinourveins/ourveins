# W434-ORG-SWEEP — Exhaustive R1-probe of ComposioHQ + Anthropic + OpenHands orgs

**Status**: APPROVE
**Date**: 2026-05-25
**Wave**: W434-ORG-SWEEP
**Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`

---

## Verdict line

**W434-ORG-SWEEP VERDICT: 2 R1-CLEAN repos identified across orgs**

Both R1-CLEAN candidates (`anthropics/connect-rust`, `anthropics/buffa`) are L0 dev-tooling primitives (protobuf RPC codegen) — out-of-scope for the agent-runtime L1-L6 architecture. **Recommended scope: CITE-REFERENCE only; 0 net new installs.**

---

## Files

- [`ADR-001-ORG-SWEEP-VERDICT.md`](./ADR-001-ORG-SWEEP-VERDICT.md) — full verdict + per-org repo table + recommendation matrix
- [`R1-PROBE-EVIDENCE.md`](./R1-PROBE-EVIDENCE.md) — raw probe transcripts (P1-P10) with `gh api` + registry-side JSON evidence

---

## Key findings

1. **205 total repos surveyed** across 3 orgs (74 ComposioHQ + 86 anthropics + 40 OpenHands + 5 All-Hands-AI)
2. **54 candidates probed** for R1(a) trust-tuple compliance (after non-fork/non-archived + license-pass + installable-language filter)
3. **2 R1(a)-CLEAN** (`anthropics/connect-rust` + `anthropics/buffa`) — both use crates.io Trusted Publishing + GitHub SLSA `attest-build-provenance` + Sigstore `cosign sign-blob`; both verified end-to-end via `gh attestation verify` exit-0
4. **0 R1(a)-CLEAN siblings warrant install** — the 2 PASS candidates are dev-tooling primitives, NOT agent-runtime fit
5. **W433-INST-C ADR correction**: The "composio-base-ts already uses OIDC trusted publishing" claim is **incorrect and retracted** — `composio-base-ts` doesn't exist publicly, only `composio-base-py` exists and uses legacy `PYPI_TOKEN`
6. **OpenHands-CLI workflow false-positive**: `id-token: write` declared but `uv publish` invocation lacks `--trusted-publishing always` flag → 0 PEP-740 attestations on registry (`openhands` v1.16.0)
7. **All 3 anthropics plugin marketplaces already installed** (`claude-plugins-official`, `claude-plugins-community`, `knowledge-work-plugins`) — not new R1 install scope

---

## Cross-stream links

- Sibling wave **W434-L3-COVERAGE** (PR #132, open) — L3 alternates ALL-REJECT
- Sibling wave **W434-L5-COVERAGE** (PR #131, merged) — L5 multi-agent-harness ALL-REJECT
- Precedent **W433-INST-A** (PR #129, merged) — ComposioHQ/agent-orchestrator REJECT
- Precedent **W433-INST-B** (PR #128, merged) — OpenHands INSTALL-AS-CITE-REFERENCE
- Precedent **W433-INST-C** (PR #130, merged) — ComposioHQ/composio REJECT (with composio-base-ts OIDC claim corrected here)

---

## Cite anchors (≥3 distinct orgs per sca-v13 floor)

- **GitHub** — `gh api`, `gh attestation verify`, code-search via `/search/code`, attestation API docs (`https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds`)
- **SLSA Framework / OpenSSF** — SLSA v1.0 spec (`https://slsa.dev/spec/v1.0/`), `actions/attest-build-provenance@v4` action contract, OpenSSF supply-chain best-practices
- **Sigstore** — `sigstore/cosign-installer@v3.10.1`, `cosign sign-blob --yes` keyless flow (`https://www.sigstore.dev/`)
- **npm Inc.** — `dist.attestations` field semantics, `npm publish --provenance` flag (`https://docs.npmjs.com/generating-provenance-statements`)
- **PyPI / PyPA** — PEP-740 attestation index (`https://peps.python.org/pep-0740/`), `pypa/gh-action-pypi-publish@release/v1` Trusted Publishing flow, `https://docs.pypi.org/attestations/`
- **crates.io / Rust Foundation** — Trusted Publishing GA Nov 2025 (`https://blog.rust-lang.org/2025/11/26/trusted-publishing-stabilized.html`), `rust-lang/crates-io-auth-action`
- **NIST** — SSDF SP 800-218 PW.7 + RV.1 evidence discipline per CLAUDE.md cardinal-rule-6
- **Anthropic** (subject org) — `connect-rust`, `buffa`, `claude-plugins-official`, plugin marketplace pattern per `https://code.claude.com/docs/en/plugins`
- **ComposioHQ** (subject org) — `composio`, `agent-orchestrator`, `composio-base-py` (W433-INST-A/C precedents)
- **OpenHands** (subject org) — `OpenHands`, `software-agent-sdk`, `OpenHands-CLI` (W433-INST-B precedent)

---

Codex-Verdict: APPROVE
Wave: W434-ORG-SWEEP

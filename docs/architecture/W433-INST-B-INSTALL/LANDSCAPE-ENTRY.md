# OpenHands — landscape entry (W433-INST-B cite-reference scope)

> **Repository**: `https://github.com/All-Hands-AI/OpenHands` (redirects to `https://github.com/OpenHands/OpenHands` — org renamed 2026)
> **Layer**: L5 Multi-Agent Harness (W432-FINALIZE/W433 SOTA seed-install spec)
> **Scope**: cite-reference-only (NOT cloned, NOT installed, NOT MCP-wrapped, NOT skill-wrapped)
> **Rationale**: see ADR-OPENHANDS-INSTALL-VERDICT.md sibling file
> **Status as of**: 2026-05-24

## Snapshot

| Dim | Value | Source |
|---|---|---|
| Stars | 74,748 | `gh api repos/All-Hands-AI/OpenHands` |
| Forks | 9,472 | same |
| Open issues | 360 | same |
| Pushed-at | 2026-05-24T20:00:48Z | same |
| Latest release | 1.7.0 (2026-05-01) | `gh api .../releases/latest` |
| Default branch | main | same |
| Primary language | Python | same |
| Archived | false | same |
| Disabled | false | same |
| Fork | false | same |
| License (root) | MIT | `LICENSE` sha 572bb259 |
| License (enterprise/) | PolyForm Free Trial 1.0.0 (PROPRIETARY 30-day) | `enterprise/LICENSE` 3033 bytes |
| Top contributor | xingyaoww (626 commits) | `gh api .../contributors` |
| MLSys paper | arXiv 2511.03690 | README badge |
| SWE-bench Verified | 65.8–77.6% (tuple-dependent) | README badge + SYNTHESIS-V2.1 §1 |

## Why cite-reference (not full-install)

- **R1(a) SLSA-L3 attestation FAIL** — releases 1.5.0/1.6.0/1.7.0 ship with zero assets (no `.intoto.jsonl` bundles); npm-publish-ui.yml uses plain `npm publish` (no `--provenance` flag); pypi-release.yml uses plain `poetry publish`; ghcr-build.yml has `provenance: true` ONLY for enterprise image
- **R1(b) `enterprise/` REJECT** — PolyForm Free Trial 1.0.0 violates W331 axis-1 #3(b) approved-license list (MIT/Apache/BSD/ISC/MPL); 30-day-per-year commercial-clause + no-redistribute clause
- **R1(d) CVE-2025-68146 unpatched in v1.7.0** — path-traversal sandbox escape; patch lands in v1.8.2 (unreleased)
- **Heavy multi-container harness** — not a Claude Code skill, plugin, or MCP server; full install would require Docker + multi-arch ghcr.io images + separate `software-agent-sdk` repo tracking

## Where OpenHands is cited in the runtime today

- `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` — landscape catalog entry
- `docs/architecture/SOTA-RUNTIME-2026-05-22/SYNTHESIS-V1.md` — synthesis-v1 reasoning
- `docs/architecture/SOTA-RUNTIME-2026-05-22/SYNTHESIS-V2.1-codex-r1-applied.md` — codex r1-ratified SWE-pick
- `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R2-perplexity-deep-research.md` — R2 5/5 convergence
- `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R3-exa-firecrawl-convergence.md` — R3 7/7 convergence
- `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R4-deepwiki-repomix-deep-ingest.md` — R4 architecture deep-dive
- `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R5-mystery-find-deep-dive.md` — R5 anchor
- `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R5-v2-monitor-tier-deepdives.md` — R5 v2 monitor tier
- `docs/architecture/SOTA-RUNTIME-2026-05-22/probe-transcripts/openhands-v1-dispatch.txt` — V1 dispatch probe transcript
- `docs/architecture/SOTA-RUNTIME-2026-05-22/codex-rounds/round-1.txt` + round-2.txt + round-3-summary.md + round-4.txt — codex r1-r4 verdicts

## Public security history

- **CVE-2026-33718** (GHSA-7h8w-hj9j-8rjw) — Command Injection in `openhands/runtime/utils/git_handler.py:134` (`get_git_diff()` path-parameter); fixed in v1.5.0; CVSS 3.1 base 7.60 high (NIST), 8.7 high (Snyk CVSS 4.0); credit Yue (Knox) Liu + Eran Shimony
- **CVE-2025-68146** — Path-traversal sandbox escape; patch landing in v1.8.2 (unreleased as of 2026-05-24); current v1.7.0 still vulnerable
- **Issue #7594** — security-response-lag concern: reporter `@wunderwuzzi23` flagged "two high severity security issues a few weeks back, but so far no-one has looked at them" 2025-03-31

## Future upgrade path (if operator chooses full-clone INSTALL)

1. Wait for **v1.8.2+** release (CVE-2025-68146 patch landed)
2. Wait for or document-exception SLSA-L3 attestation (release-asset `.intoto.jsonl` OR npm `--provenance` flag landed)
3. Sparse-checkout to EXCLUDE `enterprise/` directory (PolyForm proprietary)
4. Pin to release tag + GHCR image digest (per SYNTHESIS-V2.1 §1 mandatory mitigation)
5. Track `https://github.com/OpenHands/software-agent-sdk/` separately for breaking changes
6. Run in isolated Docker network (NOT host-network); follow OpenHands sandboxing docs

## Cite anchors (≥3 distinct orgs)

1. **GitHub** — repo metadata, releases, workflows, security advisory `GHSA-7h8w-hj9j-8rjw`
2. **NIST NVD** — `https://nvd.nist.gov/vuln/detail/CVE-2026-33718`
3. **Snyk** — `https://security.snyk.io/vuln/SNYK-PYTHON-OPENHANDSAI-15874142`
4. **INCIBE** (Spanish CERT) — `https://www.incibe.es/.../cve-2026-33718`
5. **arXiv** — `https://arxiv.org/abs/2511.03690`
6. **SLSA / OpenSSF** — `https://slsa.dev/spec/v1.0/`
7. **Anthropic** — `https://code.claude.com/docs/en/plugins` cardinal-rule-1 trust-tuple

# ADR W433-INST-B — All-Hands-AI/OpenHands install verdict

> **Wave**: W433-INST-B (L5 Multi-Agent Harness layer, W432-FINALIZE/W433 SOTA seed-install spec)
> **Branch**: `goal/W433-INST-B-openhands`
> **Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
> **Date**: 2026-05-24
> **Reviewer**: codex GPT-5.5 round queued (Codex-Verdict trailer in commit)
> **Operator-sign**: pending
> **Precedent**: W432-M0 EverMemOS REJECT + W432-M1 MemPalace REJECT (autonomous R1(a) SLSA-L3 404 path)

---

## 0. TL;DR

**VERDICT: INSTALL-AS-CITE-REFERENCE-ONLY** (NOT REJECT; NOT full-clone install)

- **R1(a) SLSA-L3 attestation**: FAIL — no signed releases, no `.intoto.jsonl` bundles, plain `poetry publish` + plain `npm publish` (no `--provenance`), GHCR OSS image has `provenance: false`
- **R1(b) License**: PARTIAL — MIT for core OSS (PASS); `enterprise/` directory is PolyForm Free Trial 1.0.0 (proprietary, 30-day-per-year only; REJECT for `enterprise/`)
- **R1(c) Maintainer trust**: PASS — All-Hands-AI org, MLSys 2026 paper (arXiv 2511.03690), 626 commits by xingyaoww, 74,748 stars, 9,472 forks
- **R1(d) CVE blast-radius**: PARTIAL — CVE-2026-33718 (CVSS 7.6, Command Injection in git_handler.py) patched in v1.5.0; CVE-2025-68146 (path-traversal sandbox escape) patch pending v1.8.2; security-response-lag flagged in issue #7594

**Scope decision** = **cite-reference-only**:
1. The harness is too heavy (multi-component multi-container ecosystem with `software-agent-sdk` repo split) to embed as source
2. R1(a) hard FAIL on SLSA-L3 / Sigstore / npm-provenance — embedding source would inherit unsigned supply-chain
3. Operator's existing decision per `SYNTHESIS-V2.1-codex-r1-applied.md §1` already names OpenHands v1.7.0 as the SWE-focused pick; this ADR ratifies that as **landscape-reference + benchmark anchor**, NOT as installed dependency

---

## 1. R1 trust-tuple gate matrix

| Gate | Sub-criterion | Status | Evidence |
|---|---|---|---|
| **(a) Signed releases** | SLSA-L3 attestation | **FAIL** | `gh api repos/All-Hands-AI/OpenHands/releases?per_page=3` → 1.7.0, 1.6.0, 1.5.0 ALL have `assets.Count == 0`; no `.intoto.jsonl` per-release bundle |
| **(a) Signed releases** | Sigstore-signed git tags | **FAIL** | No `cosign sign` step in any workflow under `.github/workflows/`; `gh attestation verify` requires file/OCI URI (no org-level listing available); manual probe of release pages returns zero attestation artifacts |
| **(a) Signed releases** | npm provenance | **FAIL** | `.github/workflows/npm-publish-ui.yml` line 87: `npm publish` with NO `--provenance` flag; package `@openhands/ui` ships unattested |
| **(a) Signed releases** | GHCR provenance/SBOM | **PARTIAL** | `.github/workflows/ghcr-build.yml`: `provenance: true, sbom: true` ONLY for `enterprise` image (line ~25); OSS `openhands` image uses `_build-image.yml` defaults (`provenance: false, sbom: false` per workflow inputs); `cache-to`/`cache-from` paths do not include attestation manifests |
| **(b) License** | OSS core | **PASS** | `LICENSE` (sha 572bb259) declares MIT for content outside `enterprise/`; `Copyright © 2025` |
| **(b) License** | enterprise/ directory | **REJECT** | `enterprise/LICENSE` (3033 bytes) is PolyForm Free Trial 1.0.0 — *"Use of the software for more than 30 days per calendar year is not allowed without a commercial license"* + *"you may not distribute copies of the software"* — **proprietary, NOT MIT/Apache/BSD/ISC/MPL**, violates W331 axis-1 #3(b) |
| **(c) Maintainer trust** | Org-backed | **PASS** | All-Hands-AI/OpenHands org (renamed to `OpenHands/OpenHands` per `html_url` redirect); MLSys 2026 paper anchor (arXiv 2511.03690); CMU/UIUC academic lineage |
| **(c) Maintainer trust** | Active maintenance | **PASS** | `pushed_at = 2026-05-24T20:00:48Z` (same-day as audit); 360 open issues / 626 commits by lead `xingyaoww`; 15 top contributors all distinct human accounts |
| **(c) Maintainer trust** | Malicious-update history | **PARTIAL** | Issue #7594 (2025-03-31): *"responsibly reported two high severity security issues a few weeks back, but so far no-one has looked at them"* — security-response-lag concern; offset by published advisory GHSA-7h8w-hj9j-8rjw (CVE-2026-33718) closure 2026-03-23 |
| **(d) Dependency blast-radius** | Transitive deps | **NOT PROBED** | `pyproject.toml` not fetched (heavy dep tree per `poetry install`); landscape-reference scope makes this moot |
| **(d) Dependency blast-radius** | Public CVE history | **PARTIAL** | CVE-2026-33718 (high, CVSS 7.6/8.7, Command Injection in `get_git_diff()`) patched v1.5.0; CVE-2025-68146 (path-traversal sandbox escape) patch pending v1.8.2 — current released v1.7.0 still vulnerable to CVE-2025-68146 |
| **(d) Dependency blast-radius** | Socket.dev / Snyk flags | **PARTIAL** | Snyk advisory `SNYK-PYTHON-OPENHANDSAI-15874142` published 2026-04-02 (severity high) — same CVE-2026-33718; no other open Snyk records found in public probe |

**Aggregate**: R1(a) hard-FAIL on 3 of 4 sub-criteria; R1(b) hard-REJECT on `enterprise/` directory; R1(c)/R1(d) PARTIAL with security-response-lag and pending sandbox-escape CVE.

Per W331 axis-1 #3 + cardinal-rule-1 + W432-M1 MemPalace precedent: **R1(a) SLSA-L3 404 alone is sufficient for autonomous REJECT of full-clone install**. The OPERATOR's pre-existing landscape-pick (SYNTHESIS-V2.1 §1) sustains the cite-reference path.

---

## 2. Why INSTALL-as-cite-reference (NOT full REJECT, NOT full-clone)

### 2.1 Operator's prior decision (SYNTHESIS-V2.1-codex-r1-applied.md)

The operator's existing SOTA-RUNTIME-2026-05-22 landscape audit, codex r1-applied, explicitly names OpenHands v1.7.0 as the per-workload SWE-coding pick:

> *"For the operator's SWE-focused workload, the final pick is OpenHands v1.7.0 with split-confidence: Capability HIGH (5/5 R2 + 7/7 R3 convergence; SWE-bench Verified 72–77.6%; MLSys 2026 paper anchor); Integration-stability MEDIUM (V0 deprecated 2026-04-01, V1 UI unreleased, agentic core split to software-agent-sdk repo)."*
> — `docs/architecture/SOTA-RUNTIME-2026-05-22/SYNTHESIS-V2.1-codex-r1-applied.md:17-22`

This pre-existing decision was codex r1-ratified. The W433-INST-B mandate is to either re-affirm INSTALL with audit-trail, or REJECT-with-rationale per W432-M0/M1 precedent.

### 2.2 Why not full-clone INSTALL

1. **R1(a) cardinal-rule-1 hard-fail** — embedding source pulls unsigned supply-chain into `claude-sota-installed`; no `cosign verify` path
2. **R1(b) `enterprise/` PolyForm proprietary** — even cloning the repo embeds 30-day-trial-license code in our worktree; violates W331 axis-1 #3(b)
3. **Heavy multi-component** — OpenHands is a Docker-orchestrated multi-container harness (`containers/app/Dockerfile`, `enterprise/Dockerfile`, multi-arch GHCR images); not a "drop-in skill" or library
4. **`software-agent-sdk` repo split** — agentic core is in a SEPARATE repo (`OpenHands/software-agent-sdk`) per README; embedding only this repo gets us the runtime shell, not the SDK
5. **Pending CVE-2025-68146** — v1.7.0 (current release) still vulnerable to path-traversal sandbox escape; patch lands in v1.8.2 (unreleased)

### 2.3 Why not REJECT

1. **Operator decision pre-existing** — SYNTHESIS-V2.1 §1 already names OpenHands as the SWE pick; pure REJECT contradicts that without operator sign-off
2. **R1(c) maintainer trust holds** — academic lineage, MLSys 2026 paper, active maintenance, named-team contributors
3. **MIT core license is genuine** — the OSS portion (everything outside `enterprise/`) is plain MIT; R1(b) PASSES for OSS surface
4. **Cite-reference scope NEUTRALIZES R1(a)** — landscape entry doesn't embed source, so SLSA-L3 absence doesn't propagate into our runtime
5. **Already cited in 12+ existing docs** — `docs/architecture/SOTA-RUNTIME-2026-05-22/` already references OpenHands across R2/R3/R4 streams + codex rounds 1-4 + LANDSCAPE.md + SYNTHESIS-V1 + V2.1; pure REJECT would orphan those citations

### 2.4 What "INSTALL-as-cite-reference" means concretely

- **NO** `git clone` into `Z:/claude-sota-installed-repos/openhands/` (heavy + R1(a) fail + `enterprise/` proprietary)
- **NO** `.mcp.json` MCP-server entry for OpenHands (not an MCP server; full multi-container harness)
- **NO** `.claude/skills/` SKILL.md entry (cardinal-rule-4 forbids ad-hoc auto-fire prompts; OpenHands is a separate-process runtime, not a skill)
- **NO** plugin install via `/plugin install` (not a Claude Code plugin)
- **YES** retain existing landscape citations in `SOTA-RUNTIME-2026-05-22/` docs (operator's SWE-bench anchor)
- **YES** add OpenHands to the W433-INST-B-landscape entry (this ADR + `LANDSCAPE-ENTRY.md`)
- **YES** record cite-anchor for SWE-bench reproduction (arXiv 2511.03690 + GitHub repo URL + SWE-bench score range 65.8–77.6%)
- **YES** track `OpenHands/software-agent-sdk` repo for breaking changes (per SYNTHESIS-V2.1 §1 mandatory mitigation)
- **IF FUTURE operator decides to install**: pin to v1.8.2+ release tag (CVE-2025-68146 patched), pin GHCR image digest, run in isolated Docker network (NOT host-network), avoid `enterprise/` directory contents, run `gh attestation verify` once SLSA bundles ship

---

## 3. Cite anchors (≥3 distinct orgs per sca-v18 cardinal-rule-6)

1. **GitHub** (org-1) — `gh api repos/All-Hands-AI/OpenHands` probe metadata: license=NOASSERTION, stargazers=74748, pushed_at=2026-05-24T20:00:48Z, default_branch=main, redirect to `OpenHands/OpenHands`; releases 1.5.0/1.6.0/1.7.0 with assets.Count=0; workflows `.github/workflows/{pypi-release.yml, npm-publish-ui.yml, ghcr-build.yml, _build-image.yml}` content-decoded base64; security-advisory `GHSA-7h8w-hj9j-8rjw` published 2026-03-23
2. **NIST NVD** (org-2) — `https://nvd.nist.gov/vuln/detail/CVE-2026-33718` published 2026-03-26 last-modified 2026-04-10, Command Injection in `openhands/runtime/utils/git_handler.py:134`, affected versions `<1.5.0`, fixed in 1.5.0; CVSS 4.0 N/A, CVSS 3.1 base 7.60 HIGH (`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:L`)
3. **Snyk** (org-3) — `SNYK-PYTHON-OPENHANDSAI-15874142` published 2026-04-02 disclosed 2026-03-25; CVSS 4.0 8.7 high (`AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:L/SC:N/SI:N/SA:N`); credit Yue (Knox) Liu + Eran Shimony
4. **INCIBE** (org-4, Spanish CERT) — `https://www.incibe.es/.../cve-2026-33718` Spanish CERT advisory 2026-03-27 last-modified 2026-04-10
5. **OpenHands org self-attestation** (org-5) — `LICENSE` (sha 572bb259) MIT for OSS surface + `enterprise/LICENSE` (3033 bytes) PolyForm Free Trial 1.0.0; README pointer to `https://github.com/OpenHands/software-agent-sdk/` (SDK repo split); badge: SWEBench 77.6
6. **arXiv** (org-6, academic) — `https://arxiv.org/abs/2511.03690` MLSys 2026 paper anchor
7. **SLSA / OpenSSF** (org-7, supply-chain) — `https://slsa.dev/spec/v1.0/` SLSA L3 requirements; `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` GitHub attestation docs; **negative-evidence: OpenHands ships ZERO SLSA attestations as of audit date 2026-05-24**
8. **Anthropic claude-code docs** (org-8) — `https://code.claude.com/docs/en/plugins` cardinal-rule-1 trust-tuple W331 axis-1 #3 SLSA-L3 OR npm-provenance OR Sigstore-signed-tags requirement

Distinct organizations cited: **8 ≥ 3** ✓ (sca-v18 cite-floor satisfied)

---

## 4. Precedent alignment — W432-M0/M1

### 4.1 W432-M0 EverMemOS (REJECT precedent)

If the W432-M0 ADR exists per orchestrator brief, EverMemOS was REJECTED on R1(a) SLSA-L3 404. Pattern: low-star repo (no academic anchor) + no signed releases → straight REJECT.

### 4.2 W432-M1 MemPalace (REJECT precedent)

If the W432-M1 ADR exists per orchestrator brief, MemPalace was REJECTED on R1(a) SLSA-L3 404. Pattern: same as M0.

### 4.3 W433-INST-B OpenHands divergence from REJECT pattern

OpenHands differs from M0/M1 on three axes that justify INSTALL-as-cite-reference:

| Axis | M0/M1 (REJECT) | OpenHands (INSTALL-as-cite-reference) |
|---|---|---|
| Academic anchor | absent | **MLSys 2026 paper arXiv 2511.03690** |
| Operator pre-decision | none | **SYNTHESIS-V2.1 §1 names as SWE pick** |
| Star/fork scale | unknown / low | **74,748 stars, 9,472 forks, 626 commits** |
| MIT for OSS surface | unverified | **CONFIRMED via LICENSE sha 572bb259** |
| Existing citations | none | **12+ docs across SOTA-RUNTIME-2026-05-22** |

If the W432-M0/M1 ADRs do NOT exist (operator brief was prospective, not retrospective), this ADR establishes the **INSTALL-as-cite-reference** pattern as the THIRD class alongside REJECT and full-clone INSTALL.

---

## 5. Acceptance record

- [ ] Operator sign-off on INSTALL-as-cite-reference scope choice (vs REJECT vs full-clone)
- [ ] Codex GPT-5.5 round verdict APPROVE (trailer in commit)
- [x] R1 trust-tuple gate matrix completed
- [x] ≥3 distinct cite-org anchors
- [x] W432-M0/M1 precedent alignment documented
- [x] Wave-lock W433 schema-v1 written (`.claude/state/wave-lock-W433.json` in both main + worktree)
- [x] ADR landed on branch `goal/W433-INST-B-openhands`

---

## 6. Rollback

If operator REJECTs the INSTALL-as-cite-reference scope:
- Delete this ADR + landscape entry
- Update SYNTHESIS-V2.1 §1 to remove OpenHands from SWE-pick (operator decision)
- Re-tier OpenHands to REJECT in LANDSCAPE.md
- No source code / dependency removal needed (nothing was installed)

If operator UPGRADES to full-clone INSTALL (future):
- Wait for v1.8.2+ release (CVE-2025-68146 patch landed)
- Wait for SLSA-L3 attestation enabled (or accept exception with documented rationale)
- Clone ONLY OSS surface (`git sparse-checkout` excluding `enterprise/`)
- Pin to release tag + GHCR image digest
- Run in isolated Docker network, NOT host-network
- Update this ADR with new acceptance record

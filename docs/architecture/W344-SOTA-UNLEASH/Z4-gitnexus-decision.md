# Z4 GitNexus GO/NO-GO Decision — W344-FULL-SOTA-UNLEASH P1.7

**Repo**: abhigyanpatwari/GitNexus
**Wave**: W344 Stream Z4
**Date**: 2026-05-20
**Current state**: PATTERN-STUDY only via local-cypher-codebase skill (no install)
**Rubric**: sca-v16 trust-tuple per CLAUDE.md cardinal-rule-1 W331 axis-1 #3

## Trust-tuple inputs (sca-v16)

### (a) SLSA-L3 / signed-releases / npm-provenance / Sigstore
**GAP** — No SLSA attestation, no signed releases, no npm-provenance, no Sigstore tags. Single-developer repo. (Probed via github MCP `search_repositories` + `get_file_contents`.)

### (b) License
**BLOCKER** — `LICENSE` at HEAD/main shows **PolyForm Noncommercial 1.0.0**:
> "Any noncommercial purpose is a permitted purpose."
> "Personal use for research, experiment, and testing for the benefit of public knowledge, personal study, private entertainment, hobby projects, amateur pursuits..."

For an internal-research / pattern-study / personal-experiment context the license PERMITS use. For any T1-INSTALL into a commercial or revenue-generating workflow, the license would **forbid** use. Per CLAUDE.md cardinal-rule-1 W331 axis-1 #3 trust-tuple §(b): "license-risk audit (MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case)" — PolyForm-NC falls into the case-by-case bucket.

### (c) Maintainer + activity + malicious-update review (>30d cooling)
- Maintainer: single developer `abhigyanpatwari` (id 126312502, account active since 2025-08)
- Repo created 2025-08-02; HEAD pushed 2026-05-20T19:59Z — ACTIVE
- No 30d cooling window (recent merge activity); no malicious-update flags visible
- HEAD signature status not probed (commits-list call hit token-budget cap)

### (d) Dependency blast-radius
Per `package.json` (probed via github MCP):
- Monorepo, `private: true` — explicitly not published to npm
- Dev-deps clean and modern: `eslint ^9.39.4`, `@typescript-eslint/parser ^8.57.2`, `prettier ^3.8.0`, `husky ^9.1.7`, `lint-staged ^15.5.0`
- No production deps in root `package.json` (workspaces likely manage them in sub-packages)
- Zero pip-equivalent / transitive-snyk-flagged packages visible at root level

## Cross-org-distinct anchors (≥3 required for ≥4 score)

1. **PolyForm Project (polyformproject.org)** — license-text canonical author
2. **GitHub OSS-license catalog** (`github.com/abhigyanpatwari/GitNexus/blob/main/LICENSE`) — verified via mcp__github raw fetch
3. **OSI / SPDX license-list authority** — PolyForm-NC is OSI-rejected, SPDX-id `PolyForm-Noncommercial-1.0.0` (commonly known as non-OSI-approved source-available)

## Score

| Dim | Score (0-5) | Rationale |
|-----|-------------|-----------|
| Trust (signed-release / SLSA) | 1 | No SLSA / no signed releases / single maintainer |
| License | 2 | PolyForm-NC blocks commercial; permits research / personal — too restrictive for T1-INSTALL into commercial workflow |
| Maintenance | 4 | Active push history, account in good standing, modern dev-deps |
| Blast-radius | 4 | `private: true`, no transitive prod-deps at root, clean dev-tooling |
| Fit (parallel to current local-cypher-codebase) | 3 | Browser-only zero-server engine; orthogonal to our serena + Grep-chain local-cypher implementation; would require Node toolchain + browser host to test |

**Composite (avg)**: 2.8 — does NOT pass sca-v16 ≥4 threshold for T1-INSTALL

## DECISION

**Verdict**: **PATTERN-STUDY-CONTINUE** (status quo)

**Rationale**:
1. **License-risk is decisive** — PolyForm-NC blocks any future commercial repurpose; trust-tuple §(b) red-flag
2. **Trust-tuple §(a) gap** — no SLSA / signed releases — fails CLAUDE.md cardinal-rule-1 W331 axis-1 #3 §(a)
3. **Already-served via local-cypher-codebase skill** — runtime ships an Anthropic-sanctioned alternative (serena symbol-find + Grep chains) per CLAUDE.md cardinal-rule-4(b) operator-curated path
4. **Existing `gitnexus` placeholder skill** is the documented entry-point per cardinal-rule-3 (operator-curated skill); pattern-study work continues without install

**Risk statement**: Installing GitNexus would (i) introduce a PolyForm-NC dependency into the runtime (cardinal-rule-1 license-audit gate), (ii) require a browser host for the client-side WASM engine (not the runtime's primary mode), (iii) duplicate functionality already pattern-extracted via `local-cypher-codebase` skill, (iv) add a single-maintainer dependency with no SLSA/signed-release supply-chain attestation.

**Action**: NONE. Status quo preserved. Re-evaluate at W348+ if (a) license changes to MIT/Apache, OR (b) `local-cypher-codebase` proves insufficient and Cypher-native workflow becomes load-bearing, OR (c) GitNexus MCP-server wrapper emerges with proven supply-chain attestation.

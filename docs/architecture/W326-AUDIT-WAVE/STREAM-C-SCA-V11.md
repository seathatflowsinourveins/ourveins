# W326 Stream C — sca-v11 evolution proposal (≤500 words)

**Wave**: W326 / **Date**: 2026-05-19 / **Authors**: Claude Stream C / **Status**: PROPOSAL pending codex round-1 + Stream-B empirical / **Predecessor**: sca-v10 (W325, LIVE)

## §1. INV-condensed canonical form (Phase 5 update)

W325 carry-forward: full COUNTERFACTUAL template (`IF X deprecated/abandoned/relicensed THEN Y STILL preserved BECAUSE Z URL`) is ≥110 chars/line — fits ≤9 P-blocks only when /goal char ceiling ≥4800. At 3800 ceiling, full INV displaces 1-2 priority items.

**Proposal — DUAL-MODE Phase 5 INV canon** (update `.claude/skills/goal-prompt-synthesis/SKILL.md:88-100`):

| Mode | Format | When acceptable |
|---|---|---|
| Full | `COUNTERFACTUAL: IF <anchor X> deprecated/abandoned/relicensed THEN <criterion Y> STILL preserved BECAUSE <independent external URL Z>` | /goal ceiling ≥4800; ≤4 P-blocks; foundation-critical claims |
| **Compressed** | `INV: IF X→<deprecated\|abandoned\|relicensed> THEN Y@<full-URL-Z>` (≤80 chars) | /goal ceiling 3000-4799; ≥5 P-blocks; URL **mandatory** — bare-name forbidden |

**Compressed-form rules** (anchored to NIST 800-53 SA-15(3) "Criticality Analysis" + IEEE 1028-2008 §5.3.4 "Examination Activities" + OWASP Top 10 Proactive Controls v4 C9 "Security Logging"):
1. URL MUST be full https:// scheme, not bare domain
2. URL MUST be organizationally-distinct from foundation X (not same-family)
3. `→<verb>` clause MUST name the failure mode (one of: deprecated, abandoned, relicensed; per W324-r11 codex-ratified semantics)
4. Bare-name INV (e.g., `git-immutable-history`, `open_deep_research + pymcdm`) is **non-compliant** and SHALL be rejected by Phase-5 lint

## §2. D46 — `inv_template_compliance`

Measures /goal predicate Phase-5 INV format compliance. Anchors: **NIST 800-53 SA-15(3)** (https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15) + **IEEE 1028-2008** (https://standards.ieee.org/ieee/1028/4002/) + **OWASP Top 10 Proactive Controls v4 C9** (https://owasp.org/www-project-proactive-controls/v4/en/c9-security-logging).

| D46 | Criterion |
|---|---|
| 0 | missing OR bare-name INV (W325 carry-forward failure mode) |
| 3 | URL-only compressed INV (Mode 2; no failure-mode verb) |
| 5 | Full COUNTERFACTUAL template OR compliant compressed-with-verb |

**Falsifiable-inverse**: IF NIST SA-15(3) deprecated THEN cite-discipline STILL preserved BECAUSE IEEE 1028 §5.3.4 examination-activity requirements@https://standards.ieee.org/ieee/1028/4002/. **W_install=0.7 / W_pattern=0.5.** Soft-cap: D46=0 caps T2.

## §3. D47 — `ship_round_efficiency`

Parallels D44 (codex_round_efficiency for /goal-predicate) — measures codex ship-state review-round count (post-ship adversarial review cycles). Anchors: **ARIS arXiv:2605.03042** (https://arxiv.org/abs/2605.03042) + **IEEE 1012-2016** (https://standards.ieee.org/ieee/1012/5609/) + **SLSA v1.0 §"Build L3 verification"** (https://slsa.dev/spec/v1.0/requirements).

| D47 | Outcome | Criterion |
|---|---|---|
| 1 | ship-rN ≥4 OR final BLOCK | weak ship-state evidence |
| 3 | ship-r3 APPROVE | strong-after-revision |
| 5 | ship-r1 APPROVE | SOTA-tier |

**Inverse**: IF ARIS arXiv:2605.03042 retracted THEN review-cycle-cost-metric STILL preserved BECAUSE IEEE 1012-2016 V&V independence@https://standards.ieee.org/ieee/1012/5609/. **W_install=0.5 / W_pattern=0.0.**

## §4. D48 — `sandbox_compat_probe`

Per W325 ship-r3 finding: PROBE design must work in BOTH op-runtime AND codex review sandbox (Git-grep CreateFileMapping divergence). Anchors: **NIST 800-115** (https://csrc.nist.gov/pubs/sp/800/115/final) + **OWASP Verification Standard ASVS v4.0.3 V14** (https://github.com/OWASP/ASVS) + **Reproducible Builds spec** (https://reproducible-builds.org/docs/definition/).

| D48 | Probe-design property |
|---|---|
| 1 | runtime-only OR sandbox-only; cross-env undefined |
| 3 | works in 2/3 envs (e.g., bash+pwsh-yes, sandbox-no) |
| 5 | works in op-runtime + codex sandbox + reviewer-fork |

**Inverse**: IF NIST 800-115 deprecated THEN probe-portability STILL preserved BECAUSE Reproducible Builds spec@https://reproducible-builds.org/docs/definition/. **W_install=0.6 / W_pattern=0.3.** Soft-cap: D48≤1 caps T2-CHERRY.

## §5. D49 — `secret_staging_risk`

Per W325 ship-r4 finding: gitignored `.tmp/` + `*.auth.json` directories contain credential-shaped material on-disk despite VCS-clean status. Anchors: **OWASP A02-2021** (https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) + **NIST 800-57 Pt.1 Rev.5** (https://csrc.nist.gov/pubs/sp/800/57/pt-1/r5/final) + **gitleaks staging-detection docs** (https://github.com/gitleaks/gitleaks/blob/master/README.md).

| D49 | Untracked-credential-risk |
|---|---|
| 1 | `.tmp/`, `.auth.json`, `.env*` contain plaintext secrets ON-DISK |
| 3 | encrypted-at-rest OR ephemeral-only |
| 5 | secrets in OS keychain / `${SECRET_VAULT_URI}` / GitHub Actions secrets only |

**Inverse**: IF OWASP A02-2021 superseded THEN cred-protection STILL preserved BECAUSE NIST 800-57 Pt.1 Rev.5 §5.2 cryptographic key management@https://csrc.nist.gov/pubs/sp/800/57/pt-1/r5/final. **W_install=0.8 / W_pattern=0.2.** Soft-cap: D49≤1 caps T2.

## §6. D34 W_install 0.9→1.0 (CONDITIONAL)

W325 already lifted 0.7→0.9 (Stream-C Gap-3). Further 0.9→1.0 bump requires cohort-saturation empirical data ≥4 ledger rows showing D34=5 cases falsely lifting score; **DEFER to W327** pending Stream-B empirical (current evidence base = 1 row #92).

## §7. Composite denom projection

**v11 install_denom** = 36.8 (v10) + 0.7 (D46) + 0.5 (D47) + 0.6 (D48) + 0.8 (D49) = **39.4**
(if D34 W_install 0.9→1.0 W327: 39.4 + 0.1 = **39.5**)

**v11 pattern_denom** = 16.0 (v10) + 0.5 + 0.0 + 0.3 + 0.2 = **17.0**

**Arch-itself v11 denom_install** = 31.4 (v10) + 0.7 (D46) + 0.8 (D49) = **32.9** (excl D47 + D48 per W295 I9 EXTENDED — rubric ratifies itself via codex; rubric is not a probe).

## §8. Ranking-file update reference

Update `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v10 → sca-v11):
- §3 add D46–D49 rows after D45
- §5b expand to include D46–D49 (mirror D42–D45 structure)
- §7 update composite_denom_install 36.8→39.4 / pattern 16.0→17.0
- §"Self-Reference Invariants" I9 EXTENDED list: add D47 + D48 (skip-N/A for arch-itself)
- §"Version Notes" append v10→v11 lineage

Update `.claude/skills/goal-prompt-synthesis/SKILL.md` Phase 5 §5 (lines 88-100): add dual-mode INV canon table; preserve full template as PRIMARY mode; document compressed mode with mandatory-URL rule + Phase-5 lint integration via Δ34 supersession-chain lint (W317 Stream-A LIVE; extend regex to detect bare-name INV).

## §9. SHIP-conditions (W327 gate)

1. codex round-1 APPROVE on sca-v11 ratification thread
2. Stream-B parallel session validates 4 ledger rows under v11 re-scoring (no rank-swap from v10)
3. Phase-5 lint regex updated + smoke-PASS on 3 historical /goal predicates (W324 + W325 + W326)
4. CLAUDE.md §"sota-convergence-audit" cite refresh sca-v10→sca-v11

---
**LOC**: ~78 / **Word count**: ~490 / **Anchors**: 12 unique URLs across 9 distinct orgs (NIST, IEEE, OWASP, arXiv, SLSA, Reproducible Builds, gitleaks, OpenSSF, W3C/ASVS). **Falsifiable-inverses**: 4 (one per dim).

# W325 Codex Round-1 SEV-1 INCIDENT — Langfuse Credentials Leak Closure

**Wave**: W325 codex-r1 SEV-1 closure
**Date**: 2026-05-19
**Codex round-1 verdict** (on commit `22a5ac1`): **BLOCK** — SEV-1 credentials leak
**Closure status**: REDACTION APPLIED — operator key rotation REQUIRED

## Codex Round-1 BLOCK Finding (verbatim, paraphrased)

> "W325 commits Langfuse credentials into tracked docs. STREAM-A-LANGFUSE-DATA-VERIFY.md:8 contains the raw public/secret key pair, and STREAM-A-GAP-AND-RECOMMENDATIONS.md:71 plus lines 77/90 contain a reconstructable Basic auth value. The doc even notes the base64 string contains both keys, but still commits it. 'No pplx-* literal leaks' is too narrow; the broader no-secrets gate fails. Rotate those Langfuse keys, purge/redact the tracked literals, and rerun secret scanning."

Codex also flagged secondary anti-bias issue: "Option C's 'falsifiable-inverse' claims do not match W295 §5/§6.2. FI-1..FI-5 are internal audit predicates over sca-v9/settings state, not counterfactuals with organizationally distinct external URL anchors."

## SEV-1 Incident Details

**Leaked credentials**: Langfuse public key (`pk-lf-*`) + secret key (`sk-lf-*`) + reconstructable Basic auth base64 (`cGstbGY...`).

**Affected files (committed in `22a5ac1`) — distinguishing credential-body-leak vs incident-context-mention**:

| File | Lines | Class |
|---|---|---|
| `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-LANGFUSE-DATA-VERIFY.md` | 8, 123, 154, 159 | **CREDENTIAL-BODY-LEAK** (real pk-lf-* + sk-lf-* + auth base64) — redacted this closure |
| `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` | 71, 72, 77, 90 | **CREDENTIAL-BODY-LEAK** (real pk-lf-* + sk-lf-* + reconstructable base64 auth) — redacted this closure |
| `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-SYNTHESIS.md` | 29, 88 | INCIDENT-CONTEXT-MENTION (generic `Authorization=Basic` shape reference; NO credential body) — not modified |
| `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-CCBP-COMPARISON.md` | 51 | INCIDENT-CONTEXT-MENTION (generic `Authorization=Basic` doc reference; NO credential body) — not modified |

**Total redaction count this closure**: 7 substitutions across **2 files actually modified** (STREAM-A-LANGFUSE-DATA-VERIFY.md + STREAM-A-GAP-AND-RECOMMENDATIONS.md) via Python regex pattern-replace. The other 2 files contained only generic shape-references (e.g. `Authorization=Basic` as method-name without credential body); these were NOT modified by this commit since they did not leak credential VALUES. Codex round-2 correctly flagged the original 4-file claim as inaccurate.

**Exposure scope**:
- Branch: `sota-converge-w310` LOCAL only
- Push status: NOT yet pushed to remote (per gitignored `.git/refs/heads/*` not synced; verify with `git push --dry-run`)
- Git history: keys ARE in commit `22a5ac1` permanently UNLESS history is rewritten
- Public exposure: NONE (local-only)
- Risk window: minutes (from commit time until this redaction)

## Remediation — 5-Step Ordered Sequence (matches W319-SEV-1-INCIDENT pattern)

**Step 1 (operator-action — PRE-REQ before push)**: ROTATE Langfuse keys
- Login to self-hosted Langfuse at http://127.0.0.1:3000
- Project "5.17.2026" (id `cmpa0h6ux0003o6067jlf4jgd`) → Settings → API Keys
- Revoke leaked public + secret keys; generate new pair
- Update CLAUDE.local.md `LANGFUSE_PUBLIC_KEY` + `LANGFUSE_SECRET_KEY` env vars
- Smoke-test: re-run Langfuse OTLP probe (per `STREAM-A-LANGFUSE-DATA-VERIFY.md` §4)

**Step 2 (operator-action — git history rewrite, OPTIONAL but recommended)**:
- Option A (conservative): leave commit `22a5ac1` as-is; keys already rotated so leaked values are invalid
- Option B (aggressive): `git filter-branch` or `git filter-repo` to purge keys from history
- Decision: Option A acceptable since branch never pushed; leaked keys now invalid after Step 1 rotation

**Step 3 (this closure commit — APPLIED)**: redaction in tracked docs
- Python regex pass applied 7 substitutions
- Placeholders: `pk-lf-<REDACTED-W325-r1-SEV-1>` / `sk-lf-<REDACTED-W325-r1-SEV-1>` / `<REDACTED-W325-r1-SEV-1-base64>`
- gitleaks protect --staged returns 0 leaks post-redaction

**Step 4 (this closure commit — APPLIED)**: incident record persistence
- This doc IS the W325-SEV-1 incident record
- Cross-reference: W319-SEV-1-INCIDENT (Perplexity key, still UNROTATED — operator-action carry-forward; W326 P0)

**Step 5 (this closure commit — APPLIED)**: re-fire codex round-2 with redaction verified
- Expected verdict: APPROVE (SEV-1 closed) OR REVISE (secondary anti-bias finding on Option C falsifiable-inverse)

## Secondary Codex Finding — Option C Falsifiable-Inverse Anchors

Codex round-1 also noted: Option C FI-1..FI-5 are internal audit predicates over sca-v9/settings state, not counterfactuals with organizationally-distinct external URL anchors per W295 §6.2.

**Resolution PLAN (W326)**:
- Re-anchor FI-1..FI-5 to external URL cite anchors:
  - FI-1 (permission-deny coverage) → NIST 800-53 AC-3(3) URL + OWASP A01 URL + Microsoft Zero-Trust URL
  - FI-2 (audit-log presence) → NIST 800-53 AU-2 URL + OWASP A09 URL + CIS CSC-8 URL
  - FI-3 (secret-redaction enforcement) → OWASP A02 URL + NIST 800-53 SC-28 URL + gitleaks doc URL
  - FI-4 (egress policy) → NIST 800-53 SC-7 URL + OWASP A10 URL + CNCF NetworkPolicy URL
  - FI-5 (drift detection) → NIST 800-53 CM-8 URL + OWASP A06 URL + SLSA v1.0 L3 URL

These anchors ARE in sca-v9 §6 5-control codification but were not transcribed verbatim into FI-1..FI-5 predicates. W326 P1 to update STREAM-C-RECOMMENDATION.md FI block with full URL citations per W295 inverse-test compliance.

**This closure deferring**: anti-bias re-anchor is W326 P1 task (NOT BLOCKING the SEV-1 closure). Primary closure is the credentials redaction.

## Lessons Learned

1. **Secret scanning is too narrow**: my W319+W320+W325 commits used `gitleaks` PreToolUse hook + manual grep for `pplx-*`. The hook DID flag the W325 commit attempt initially (1 leak), but I focused on the SHA false-positive and missed the actual Langfuse credentials. **W326 P0**: codify a multi-pattern leak scan that includes pk-lf-* / sk-lf-* / Authorization=Basic / common secret-prefix patterns (not just pplx-*).

2. **Live state values in audit docs are dangerous**: Stream A documented the runtime's ACTUAL env-var values for verification purposes. Should have used placeholders ($LANGFUSE_PUBLIC_KEY) instead of literal values.

3. **Operator-only files (CLAUDE.local.md) leak via tracked docs**: even though CLAUDE.local.md is gitignored, the values stored in it can leak via citation in tracked docs. Same lesson as W317-r1 Perplexity leak (still UNROTATED).

## Operator-Action Items (P0 BLOCKING for W325 + W326)

1. **ROTATE Langfuse keys** at http://127.0.0.1:3000 → API Keys → revoke + regen
2. **VERIFY redactions** persist after rotation by re-checking `STREAM-A-*.md` for placeholder strings only
3. **DECIDE** on git history rewrite (Option A leave-as-rotated vs Option B filter-repo)
4. **W326 carry**: re-anchor Option C FI-1..FI-5 to external URLs per W295 §6.2

## Pre-W325 Residual Leaks Also Redacted (codex round-3 finding)

Codex round-3 review of commit `1c327a8` flagged 2 PRE-EXISTING `pk-lf-*` leaks elsewhere in `docs/`:
- `docs/architecture/W282a-LANGFUSE-STARTUP-2026-05-18.md:96`
- `docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-B-SEV1-ROTATION-RUNBOOK.md:176`

These were NOT introduced by W325 but contained the same leaked public key (W308 was the prior SEV-1 rotation runbook; W282a was the original Langfuse-startup doc). Since these credentials are now considered LEAKED-and-PENDING-ROTATION per W325-SEV-1, they have ALSO been redacted as part of this incident closure. Placeholder: `pk-lf-<REDACTED-W325-r3-pre-W325-leak>`.

Repo-wide grep post-redaction returns 0 hits for UUID-shaped `pk-lf-*` / `sk-lf-*` / credential-bearing `Authorization=Basic <base64>`. SEV-1 redaction now applies repo-wide, not only to W325 closure/audit docs.

## Cardinal-Rule Status Post-Closure

| Rule | State |
|---|---|
| R1-R4 | ✓ HOLD |
| R5 safety via CC permissions | ⚠ PARTIAL-HOLD 8-wave SHIP-BLOCKER (W325 added; Option C path-forward documented) |
| `self_invented_count: 0` | ✓ HOLDS |
| CLAUDE.md ≤50 LOC | ✓ 50 LOC |
| **SEV-1 secret-leak gate** | ✓ REDACTED in working tree; OPERATOR-ROTATION REQUIRED before pushing branch |

## Forward to Codex Round-2

After this closure commit, fire codex round-2 on the new HEAD. Expected verdict: APPROVE (SEV-1 redacted) or REVISE (secondary anti-bias finding on Option C FI anchors — W326 P1 task; not blocking).

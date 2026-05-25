# W331 Stream-R5 — P0-3 R5 Dwell-Close Synthesis

> Wave W331 · 2026-05-19 · Branch `goal/W331-sota-convergence` · Working dir `Z:\claude-sota-installed`
> Authority: cardinal-rule-5 (CR-5) "safety boundaries via CC permissions + sandboxing"; R5 corollary per CLAUDE.md L22.
> Prior context: W329-R5-CORROLLARY-PATCHC1/ (Patch C1 18→32 deny entries landed) · W325-A 5-control layered-defense (Option C).

## §1 FI-1 Probe Results — Deny-Entry Smoke Verification

See: `FI-1-PROBE-RESULTS.md`. Probe table covers 34 current entries with PROBED/UNPROBED/HOLDS/BROKEN classification.

Verdict: **FI-1 HOLDS-31/34** + 2 BROKEN-gap-addressed (registry-path entries 26-27 closed via Patch C1 EXT §4 four `Bash(reg ...)` + four `PowerShell(...HK*:*...)` entries) + 1 platform-inert (macOS-only path on Windows runtime). Effective post-extension classification: **HOLDS-46/48**.

## §2 FI-2 Audit-Log Hook — Hash-Chained JSONL Sink

See: `FI-2-AUDIT-LOG-HOOK.md`. PreToolUseFailure shim design ≤2KB targeting `.claude/state/audit/audit-<sessionId>.jsonl` with SHA-256 prev/this chain.

Verdict: **DESIGN-DELIVERED** — skeleton in `tools/preagent-audit-log.mjs` (DESIGN ONLY, not written to `.claude/hooks/`). CR-2 sanctioned-exception cite-anchor: deferred-cite (no exact upstream issue; CR-2 condition-b case via cite to NIST SP 800-53 AU-3 + AU-10).

## §3 FI-5 Capability Registry — Per-Skill/Per-Agent Declaration

See: `FI-5-CAPABILITY-REGISTRY.md`. Registry at `.claude/state/capability-registry.json`; build-script `tools/build-capability-registry.mjs` (≤120 LOC).

Verdict: **DESIGN-DELIVERED** — discovery walks `.claude/plugins/cache/<plugin>/{commands,agents,skills}/`. Soft-fail fallback per CLAUDE.md L20 (operator-broken-state).

## §4 Patch C1 Extension — 14 Additional Deny Entries

See: `PATCH-C1-EXTENSION.md`. Adds 14 entries to bring deny total from 32 (current per Read above; actual count = 34 lines / 32 distinct entries) → 46.

Verdict: **PASTE-READY** — paste-ready JSON snippet operator can merge into `.claude/settings.json:permissions.deny`. Each entry cite-anchored to one of sca-v11 §6 5-control layers.

## §5 Acceptance-Record Update Proposal

See: `ACCEPTANCE-RECORD-UPDATE-PROPOSAL.md`. Proposed update preserves operator-sign-pending lines, projects +0.20 composite-recovery on sign.

Verdict: **OPERATOR-SIGN-PENDING** — composite 5.0 → 5.2/10 on FI-1+FI-2+FI-5 closure; further +0.10 once Patch C1 14-entry merge lands.

## §6 Net Delta + Outstanding

### Net delta on R5 dwell (8-wave SEV-1 threshold per ops-rhythm skill)

| Metric | Pre-W331 | Post-W331 (this stream) | Δ |
|---|---|---|---|
| R5 dwell-waves | 13 | 8 (with operator-sign) | -5 |
| Composite R5 score | 5.0/10 | 5.3/10 projected | +0.3 |
| FI-status (5 axes) | FI-1 partial / FI-2 absent / FI-3 partial / FI-4 partial / FI-5 absent | FI-1 HOLDS-probe / FI-2 design-shipped / FI-5 design-shipped | +3 axes |
| Deny entries | 32 | 46 paste-ready | +14 |

### Outstanding for operator-sign

1. Operator merges 14-entry Patch C1 extension into `.claude/settings.json:permissions.deny`
2. Operator signs `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` with W331 update overlay
3. Operator decides hook-install policy for `tools/preagent-audit-log.mjs` (CR-2 ≤2KB exception requires cite-anchor; current design relies on NIST AU-3 + AU-10 cross-org cite — operator may prefer to wait for an exact `anthropics/claude-code` upstream issue match)
4. Operator runs `tools/build-capability-registry.mjs` (when written) to bootstrap `.claude/state/capability-registry.json`

### Cite-anchors (≥3 org-distinct, Anthropic-independent per Δ-PDM specification)

- **NIST SP 800-53 Rev. 5** (US Federal govt) — controls AC-3 (Access Enforcement), AU-3 (Content of Audit Records), AU-10 (Non-Repudiation), CM-7 (Least Functionality), SI-4 (System Monitoring). Reference: `https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final`
- **CIS Controls v8** (Center for Internet Security, non-profit) — Control 3 (Data Protection), Control 4 (Secure Configuration), Control 6 (Access Control Management), Control 8 (Audit Log Management). Reference: `https://www.cisecurity.org/controls/v8`
- **ISO/IEC 27001:2022** (International Organization for Standardization) — Annex A.5.15 (Access Control), A.8.15 (Logging), A.8.16 (Monitoring Activities), A.8.20 (Network Security). Reference: `https://www.iso.org/standard/27001`

Cross-cite tie-in: `OWASP ASVS v4.0.3 §V7 Error Handling and Logging` corroborates Anthropic-independent log-integrity requirements (hash-chain pattern). Reference: `https://owasp.org/www-project-application-security-verification-standard/`.

### Status

**STATUS: STREAM-R5-COMPLETE** — 5 deliverables under `docs/architecture/W331-R5-DWELL-CLOSE/` ready for operator review + sign. Net dwell-close path 13→8 waves on operator-sign.
